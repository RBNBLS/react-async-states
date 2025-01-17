import {
  __DEV__,
  isFn,
  oneObjectIdentity,
  readProducerConfigFromSubscriptionConfig,
  shallowClone,
  shallowEqual
} from "shared";
import {supportsConcurrentMode} from "../../helpers/supports-concurrent-mode";
import {
  AsyncStateSubscriptionMode,
  UseAsyncState,
  UseAsyncStateConfiguration,
  UseAsyncStateContextType,
  UseAsyncStateSubscriptionInfo
} from "../../types.internal";
import {standaloneRunExtraPropsCreator} from "../../helpers/run-props-creator";
import AsyncState, {
  AbortFn,
  AsyncStateInterface,
  AsyncStateKey,
  AsyncStateSource,
  AsyncStateStatus
} from "../../async-state";
import {readAsyncStateFromSource} from "../../async-state/read-source";

export function inferSubscriptionMode<T, E>(
  contextValue: UseAsyncStateContextType,
  configuration: UseAsyncStateConfiguration<T, E>
): AsyncStateSubscriptionMode {
  // the subscription via source passes directly
  if (configuration[sourceConfigurationSecretSymbol] === true) {
    return configuration.fork
      ?
      AsyncStateSubscriptionMode.SOURCE_FORK
      :
      AsyncStateSubscriptionMode.SOURCE;
  }

  if (contextValue === null) {
    return AsyncStateSubscriptionMode.OUTSIDE_PROVIDER;
  }

  const {key, fork, hoistToProvider, producer} = configuration;
  if (key === undefined && configuration.source?.key === undefined) {
    return AsyncStateSubscriptionMode.STANDALONE;
  }

  const existsInProvider = !!contextValue.get(key as AsyncStateKey);

  // early decide that this is a listener and return it immediately
  // because this is the most common use case that it will be
  // we'll be optimizing this path first
  if (existsInProvider && !hoistToProvider && !fork) {
    return AsyncStateSubscriptionMode.LISTEN;
  }

  // we dont want to hoist or fork
  if (!hoistToProvider && !fork && producer) {
    return AsyncStateSubscriptionMode.STANDALONE;
  }

  // we want to hoist while (not in provider or we dont want to fork)
  if (hoistToProvider && (!existsInProvider || !fork)) {
    return AsyncStateSubscriptionMode.HOIST;
  }

  // fork a hoisted
  // the provider will hoist it again
  if (fork && existsInProvider) {
    return AsyncStateSubscriptionMode.FORK;
  }

  // not found in provider; so either a mistake, or still not hoisted from
  if (!existsInProvider) {
    // waiting, or may be we should throw ?
    return AsyncStateSubscriptionMode.WAITING;
  }

  return AsyncStateSubscriptionMode.NOOP; // we should not be here
}

export function inferAsyncStateInstance<T, E>(
  mode: AsyncStateSubscriptionMode,
  configuration: UseAsyncStateConfiguration<T, E>,
  contextValue: UseAsyncStateContextType
): AsyncStateInterface<T> {
  const candidate = contextValue
    ?.get(configuration.key as string) as AsyncStateInterface<T>;

  switch (mode) {
    case AsyncStateSubscriptionMode.FORK:
      // @ts-ignore
      // contextValue is not null here, because we decide the mode based on it!
      return contextValue.fork(
        configuration.key as string,
        configuration.forkConfig
      ) as AsyncStateInterface<T>;
    case AsyncStateSubscriptionMode.HOIST:
      const {
        key,
        producer,
        runEffect,
        cacheConfig,
        initialValue,
        runEffectDurationMs,
        hoistToProviderConfig
      } = configuration;
      // @ts-ignore
      // contextValue is not null here, because we decide the mode based on it!
      return contextValue.hoist({
        key: key as AsyncStateKey,
        producer,
        runEffect,
        cacheConfig,
        initialValue,
        runEffectDurationMs,
        hoistToProviderConfig,
      });
    case AsyncStateSubscriptionMode.LISTEN:
      return candidate;
    case AsyncStateSubscriptionMode.STANDALONE:
    case AsyncStateSubscriptionMode.OUTSIDE_PROVIDER:
      return new AsyncState(
        configuration.key as AsyncStateKey,
        configuration.producer,
        readProducerConfigFromSubscriptionConfig(configuration)
      );
    case AsyncStateSubscriptionMode.SOURCE:
      return readAsyncStateFromSource(
        configuration.source as AsyncStateSource<T>);
    case AsyncStateSubscriptionMode.SOURCE_FORK: {
      const sourceAsyncState = readAsyncStateFromSource(
        configuration.source as AsyncStateSource<T>);
      return sourceAsyncState.fork(configuration.forkConfig);
    }
    case AsyncStateSubscriptionMode.NOOP:
    case AsyncStateSubscriptionMode.WAITING:
      // @ts-ignore
      return null;
    default:
      return candidate;
  }
}

export const sourceConfigurationSecretSymbol = Symbol();

export const defaultUseASConfig = Object.freeze({
  lazy: true,
  condition: true,

  areEqual: shallowEqual,
  selector: oneObjectIdentity,
});

let didWarnAboutUnsupportedConcurrentFeatures = false;

export function makeUseAsyncStateReturnValue<T, E>(
  asyncState: AsyncStateInterface<T>,
  stateValue: E,
  configurationKey: AsyncStateKey,
  run: (...args: any[]) => AbortFn,
  mode: AsyncStateSubscriptionMode
): Readonly<UseAsyncState<T, E>> {

  if (!asyncState) {
    return Object.freeze({
      mode,
      key: configurationKey,

      state: stateValue as E,

      abort() {
      },
      run(...args: any[]): AbortFn {
        return undefined;
      },
      read() {
        return stateValue;
      },
      invalidateCache() {
      },
      replaceState() {
      },
      mergePayload() {
      },
      payload: {},
    });
  }

  return Object.freeze({
    mode,
    key: asyncState.key,
    source: asyncState._source,
    payload: asyncState.payload,

    state: stateValue as E,
    lastSuccess: asyncState.lastSuccess,
    read: createReadInConcurrentMode(asyncState, stateValue as E),

    mergePayload(newPayload) {
      asyncState.payload = shallowClone(
        asyncState.payload,
        newPayload
      );
    },

    abort: asyncState.abort.bind(asyncState),
    replaceState: asyncState.replaceState.bind(asyncState),
    run: isFn(run) ? run : asyncState.run.bind(asyncState, standaloneRunExtraPropsCreator),
    invalidateCache: asyncState.invalidateCache.bind(asyncState),
  });
}

export function shouldRecalculateInstance<T, E>(
  newConfig: UseAsyncStateConfiguration<T, E>,
  newMode: AsyncStateSubscriptionMode,
  newGuard: Object,
  oldSubscriptionInfo: UseAsyncStateSubscriptionInfo<T, E> | undefined
): boolean {
  // here we check on relevant information to decide on the asyncState instance
  return !oldSubscriptionInfo ||
    newGuard !== oldSubscriptionInfo.guard ||
    newMode !== oldSubscriptionInfo.mode ||
    newConfig.producer !== oldSubscriptionInfo.configuration.producer ||
    newConfig.source !== oldSubscriptionInfo.configuration.source ||

    newConfig.fork !== oldSubscriptionInfo.configuration.fork ||
    newConfig.forkConfig?.keepState !== oldSubscriptionInfo.configuration.forkConfig?.keepState ||

    newConfig.hoistToProvider !== oldSubscriptionInfo.configuration.hoistToProvider ||
    newConfig.hoistToProviderConfig?.override !== oldSubscriptionInfo.configuration.hoistToProviderConfig?.override;
}


function createReadInConcurrentMode<T, E>(
  asyncState: AsyncStateInterface<T>,
  stateValue: E
) {
  return function readInConcurrentMode() {
    if (supportsConcurrentMode()) {
      if (
        AsyncStateStatus.pending === asyncState.currentState?.status &&
        asyncState.suspender
      ) {
        throw asyncState.suspender;
      }
    } else {
      if (__DEV__) {
        if (!didWarnAboutUnsupportedConcurrentFeatures) {
          console.error(
            "[Warning] You are calling useAsyncState().read() without having" +
            " react 18 or above. If the library throws, you will get an error" +
            " in your app. You will be receiving the state value without" +
            " any suspension.Please consider upgrading to " +
            "react 18 or above to use concurrent features."
          );
          didWarnAboutUnsupportedConcurrentFeatures = true;
        }
      }
    }
    return stateValue;
  }
}
