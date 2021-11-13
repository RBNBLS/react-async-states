---
sidebar_position: 4
sidebar_label: useAsyncState
---

# `useAsyncState`
This hook allows subscription to an async state, and represents the API that you will be interacting with the most.
Its signature is:

```javascript
function useAsyncState(configuration, dependencies) {}
```
It returns an object that contains few properties, we'll explore them in a moment.

### Standalone vs Provider
This hooks may be used inside and outside the provider and has almost the same behavior.

For example, you can use this hook to fetch the current user from your api before mounting the provider and pass the user
information to payload.

While being outside provider, it will expect you to use a producer function as configuration, or with an object defining
the producer and all other necessary information.

### Subscription modes
Many subscription modes are possible. You won't have to use them, but you should essentially
know what they mean and how your configuration impacts them for any debugging purposes.

What is a subscription mode already ?
When you call `useAsyncState` -every time your component renders- this hook reacts to the given configuration
synchronized by your dependencies. Then, tries to get the async state instance from the provider.

If not found, it may wait for it if you did not provide a `producer` function in your configuration, or fallback with a noop mode for example.

The possible subscription mode are:
- `LISTEN`: Listens to an existing async state from its key
- `HOIST`: Registers the async state in the provider, and subscribes to it (more like an injection)
- `STANDALONE`: Mimics the standalone mode
- `FORK`: Fork an existing async state in the provider
- `WAITING`: When the desired async state does not exist in provider, and you do not want to hoist it
- `SOURCE`: When you use a source object for subscription
- `SOURCE_FORK`: When you use a source object for subscription and you decide to fork it
- `OUTSIDE_PROVIDER`: When you call it outside the async state context provider
- `NOOP`: If none of the above matches, should not happen

If you are curious about how the subscription mode is inferred, please refer to the `inferSubscriptionMode` function
defined [here](./src/react/subscription/subscriptionUtils.js).

### Configuration and manipulation
The configuration argument may be a string, an object with supported properties, or a producer function (you won't be able to share it by this signature).
If it is a string, it is used inside provider to only listen on an async state, without automatically triggering the run
(but you can do it programmatically using what this hooks returns).
If an object is provided, it may act like a simple subscription or a registration of a new async state (with fork/hoist).

Let's see in details the supported configuration:

|Property               |Type         |Default Value       |Standalone|Provider|Description
|-----------------------|-------------|--------------------|----------|--------|------------------------------------------------|
|`key`                  |`string`     |`string`            |     x    |   x    | The unique key, either for definition or subscription |
|`lazy`                 |`boolean`    |`true`              |     x    |   x    | If false, the subscription will re-run every dependency change |
|`fork`                 |`boolean`    |`false`             |          |   x    | If true, subscription will fork own async state |
|`source`               |`object`     |`undefined`         |     x    |   x    | Subscribes to the hidden instance of async state in this special object |
|`producer`             |`function`   |`undefined`         |     x    |   x    | Our producer function |
|`selector`             |`function`   |`identity`          |     x    |   x    | receives state (`{data, args, status}`) as unique parameter and whatever it returns it is put in the state return |
|`areEqual`             |`function`   |`shallowEqual`      |     x    |   x    | `(prevValue, nextValue) => areEqual(prevValue, nextValue)` if it returns true, the render is skipped |
|`condition`            |`boolean`    |`true`              |     x    |   x    | If this condition is falsy, run will not be granted |
|`forkConfig`           |`ForkConfig` |`{keepState: false}`|          |   x    | defines whether to keep state when forking or not |
|`initialValue`         |`any`        |`null`              |     x    |        | The initial producer value, useful only if working as standalone(ie defining own producer) |
|`rerenderStats`        |`object`     |`{<status>: true}`  |     x    |   x    | Defines whether to register in the provider or not |
|`hoistToProvider`      |`boolean`    |`false`             |          |   x    | Defines whether to register in the provider or not |
|`hoistToProviderConfig`|`HoistConfig`|`{override: false}` |          |   x    | Defines whether to override an existing async state in provider while hoisting |

The returned object from useAsyncState contains the following properties:

|Property            |Description              |
|--------------------|-------------------------|
|`key`               | The key of the async state instance, if forked, it is different from the given one |
|`run`               | Imperatively trigger the run, arguments to this function are received as array in the execution args |
|`mode`              | The subscription mode |
|`state`             | The current selected portion of state, by default, the selector is `identity` and so the state is of shape `{status, args, data}` |
|`abort`             | Imperatively abort the current run if running |
|`source`            | The special source object of the subscribed async state instance, could be reused for further subscription without passing by provider or key |
|`payload`           | The async state instance payload (could be removed in the future) |
|`lastSuccess`       | The last registered success |
|`replaceState`      | Imperatively and instantly replace state as success with the given value (accepts a callback receiving the old state) |
|`mergePayload`      | Imperatively merge the payload of the subscribed async state instance with the object in first parameter |
|`runAsyncState`     | If inside provider, `runAsyncState(key, ...args)` runs the given async state by key with the later execution args |

We bet in this shape because it provides the key for further subscriptions, the current state with status, data and the
arguments that produced it. `run` runs the subscribed async state, to abort it invoke `abort`. The `lastSuccess`
holds for you the last succeeded value.

`replaceState` instantly gives a new value to the state with success status.
`runAsyncState` works only in provider, and was added as convenience to trigger some side effect after
the current async producer did something, for example, reload users list after updating a user successfully.

The `selector` as config in for `useAsyncState` allows you to subscribe to just a small portion of the state while
choosing when to trigger a rerender, this is an important feature and the probably the most important of this library.
It was not designed from the start, but the benefits from having it are noticeable and allowed new extensions for
the library itself.

Note :
- Calling the `run` function, if it is still `pending` the previous run, it aborts it instantly, and start a new cycle.

### Examples

Let's now make some examples using `useAsyncState`:

```javascript
import {useAsyncState} from "react-async-states";

// later and during render

// executes currentUserPromise on mount
const {state: {data, status}} = useAsyncState({key: "current-user", producer: currentUserPromise, lazy: false});

// subscribes to transactions list state
const {state: {data: transactions, status}} = useAsyncState("transactions");

// injects the users list state
const {state: {data, status}} = useAsyncState({key: "users-list", producer: usersListPromise, lazy: false, payload: {storeId}, hoistToProvider: true});

// forks the list of transactions for another store (for preview for example)
// this will create another async state issued from users-list -with a new key (forked)- without impacting its state
const {state: {data, status}} = useAsyncState({key: "users-list", payload: {anotherStoreId}, fork: true});

// reloads the user profile each time the match params change
// this assumes you have a variable in your path
// for example, once the user chooses a profile, just redirect to the new url => matchParams will change => refetch as non lazy
const matchParams = useParams();
const {state} = useAsuncState({
  ...userProfilePromiseConfig, // (key, producer), or take only the key if hoisted and no problem impacting the state
  lazy: false,
  payload: {matchParams}
}, [matchParams]);

// add element to existing state via replaceState
const {state: {data: myTodos}, replaceState} = useAsyncState("todos");
function addToDo(data) {
  replaceState(old => ({...old, [data.id]: data}));
}

// add element to existing state via run (may be a reducer)
// run in this case acts like a `dispatch`
const {state: {data: myTodos}, run} = useAsyncState("todos");

function addTodo(data) {
  run({type: ADD_TODO, payload: data});
}
function removeTodo(id) {
  run({type: REMOVE_TODO, payload: id});
}

// a standalone async state (even inside provider, not hoisted nor forked => standalone)
useAsyncState({
  key: "not_in_provider",
  payload: {
    delay: 2000,
    onSuccess() {
      showNotification();
    }
  },
  producer(argv) {
    timeout(argv.payload.delay)
    .then(function callSuccess() {
      if (!argv.aborted) {
        // notice that we are taking onSuccess from payload, not from component's closure
        // that's the way to go, this creates a separation of concerns
        // and your producer may be extracted outisde this file, and will be easier to test
        // but in general, please avoid code like this, and make it like an effect reacting to a value
        // (the state data for example)
        argv.payload.onSuccess();
      }
    })
  }
});

// hoists a controlled form to provider
useAsyncState({
  key: "some-form",
  producer(argv) {
    const [name, value] = argv.args;
    if (!name) {
      return argv.lastSuccess.data;
    }
    return {...argv.lastSuccess.data, [name]: value};
  },
  hoistToProvider: true,
  rerenderStatus: {pending: false, success: false},
  initialValue: {}
});
// later
<Input name="username" />
<Input name="password" />
<Input name="phoneNumber" />
// where
function Input({name, ...rest}) {
  const {state, run} = useAsyncState({
    key: "login-form",
    selector: state => state.data[name],
  }, [name]);
  return //...
}

```

### Other hooks
For convenience, we've added many other hooks with `useAsyncState` to help inline most of the situations: They inject
a configuration property which may facilitate using the library:

The following are all hooks with the same signature as `useAsyncState`, but each predefines something in the configuration:
- `useAsyncState.auto`: adds `lazy: false` to configuration
- `useAsyncState.lazy`: adds `lazy: true` to configuration
- `useAsyncState.fork`: adds `fork: true` to configuration
- `useAsyncState.hoist`: adds `hoistToProvider: true` to configuration
- `useAsyncState.hoistAuto`: adds `lazy: false, hoistToProvider: true` to configuration
- `useAsyncState.forkAudo`: adds `lazy: false, fork: true` to configuration

These are functions produce hooks with the same signature as `useAsyncState` (and hooks shortcuts with it)
while injecting specific properties. They do not work like the other shortcuts because they need an input for 
the property from the developer:
- `useAsyncState.payload`: adds `payload` to configuration
- `useAsyncState.selector`: adds a selector
- `useAsyncState.condition`: make the run conditional

The following snippets results from the previous hooks:

```javascript
// automatically fetches the user's list when the search url changes
const {state: {status, data}, run, abort} = useAsyncState.auto(DOMAIN_USER_PRODUCERS.list.key, [search]);
// automatically fetches user 1 and selects data
const {state} = useAsyncState.selector(s => s.data).auto(user1Source);
// automatically fetches user 2 and selects its name
const {state} = useAsyncState.selector(name).auto(user2Source);
// automatically fetches user 3 and hoists it to provider and selects its name
const {state} = useAsyncState.payload({userId: 3}).selector(name).hoistAuto(userPayloadSource);
// forks userPayloadSource and runs it automatically with a new payload and selects the name from result
const {state} = useAsyncState.selector(name).payload({userId: 4}).forkAuto(userPayloadSource);
```