export let GLOBAL = {
  BalanceState: null,
  MovementsState: null,
  HeaderState: null
};

let demo = true;

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
  return demo === true ? "***.**" : inputString;
}

export function realOrDemoIcon() {
  return demo === true ? "toggle-switch-off" : "toggle-switch";
}
