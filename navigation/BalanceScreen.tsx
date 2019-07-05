import React from "react";
import Balance from "../components/Balance";

export default class BalanceScreen extends React.PureComponent {
  static navigationOptions = {
    headerTitle: "Balance"
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);

    if (balance && movements) {
      return <Balance balance={balance} />;
    }
  }
}
