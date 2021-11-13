import React from "react";
import { useAsyncState } from "react-async-states";

function producer(argv) {
  argv.onAbort(() => console.log('aborting!!'))
  console.log('running!!', argv.payload)
  return argv.payload.entry;
}

let meter = 0;

export default function Demo() {
  const {state, mergePayload, run} = useAsyncState({
    producer,
    lazy: true,
    key: "random",
    initialValue: 0,
    selector: d => d.data,
  });
  return <button onClick={() => {
    mergePayload({entry: ++meter});
    run();
  }}>This is a demo, {JSON.stringify(state)}</button>
}