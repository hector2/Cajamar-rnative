export let GLOBAL = {
  BalanceState: null,
  MovementsState: null,
  HeaderState: null
};

let demo = false;

export interface DemoState {
  demo: boolean;
}

export function toggleDemo() {
  demo = !demo;
  GLOBAL.BalanceState.setState({
    demo: demo
  });

  GLOBAL.MovementsState.setState({
    demo: demo
  });

  GLOBAL.HeaderState.setState({
    demo: demo
  });
}

export function realOrDemo(inputString) {
  return demo === true
    ? Math.floor(Math.random() * 2000 + 1).toString()
    : inputString;
}

export function realOrDemoIcon() {
  return demo === true ? "toggle-switch-off" : "toggle-switch";
}
