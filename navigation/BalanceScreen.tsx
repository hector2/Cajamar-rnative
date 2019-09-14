import React from "react";
import { Button } from "react-native";
import Balance from "../components/Balance";

export default class BalanceScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);
    const dateRange = navigation.getParam("dateRange", undefined);

    console.log("dateRange", dateRange)

    if (balance && movements && dateRange) {
      return (<Balance balance={balance} />)
    }
  }
}
