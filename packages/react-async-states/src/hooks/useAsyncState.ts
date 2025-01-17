import {useAsyncStateBase} from "./useAsyncStateBase";
import {UseAsyncState, UseAsyncStateConfig} from "../types.internal";

// default
function useAsyncStateExport<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies
  );
}

// auto runs
const autoConfigOverrides = Object.freeze({lazy: false});

function useAutoAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    autoConfigOverrides
  );
}

// lazy
const lazyConfigOverrides = Object.freeze({lazy: true});

function useLazyAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    lazyConfigOverrides
  );
}

// fork
const forkConfigOverrides = Object.freeze({fork: true});

function useForkAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    forkConfigOverrides
  );
}

// fork auto
const forkAutoConfigOverrides = Object.freeze({fork: true, lazy: false});

function useForkAutoAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    forkAutoConfigOverrides
  );
}

// hoist
const hoistConfigOverrides = Object.freeze({hoistToProvider: true});

function useHoistAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    hoistConfigOverrides
  );
}

// hoistAuto
const hoistAutoConfigOverrides = Object.freeze({
  hoistToProvider: true,
  lazy: false
});

function useHoistAutoAsyncState<T, E>(
  subscriptionConfig: UseAsyncStateConfig<T, E>,
  dependencies?: any[]
): UseAsyncState<T, E> {
  return useAsyncStateBase(
    subscriptionConfig,
    dependencies,
    hoistAutoConfigOverrides
  );
}

useAsyncStateExport.auto = useAutoAsyncState;
useAsyncStateExport.lazy = useLazyAsyncState;
useAsyncStateExport.fork = useForkAsyncState;
useAsyncStateExport.hoist = useHoistAsyncState;
useAsyncStateExport.forkAuto = useForkAutoAsyncState;
useAsyncStateExport.hoistAuto = useHoistAutoAsyncState;

export const useAsyncState = Object.freeze(useAsyncStateExport);
