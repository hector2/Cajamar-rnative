export let GLOBAL = {
  BalanceState: null,
  MovementsState: null
};

let demo = false;

export interface DemoState {
  demo: boolean;
}

export function toggleDemo() {
  console.log("hola");
  demo = !demo;
  GLOBAL.BalanceState.setState({
    demo: demo
  });

  GLOBAL.MovementsState.setState({
    demo: demo
  });
}

export function realOrDemo(inputString) {
  return demo === true
    ? Math.floor(Math.random() * 2000 + 1).toString()
    : inputString;
}
