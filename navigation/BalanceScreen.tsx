import React from "react";
import { Button, View, ScrollView } from "react-native";
import Balance from "../components/Balance";
import DateRangePicker from "../components/DateRangePicker";
import {
  getStoredMovements,
  calculateBalance,
  onRangePicked
} from "../BankLogic";
import { isAfter, isSameDay, isBefore } from "date-fns";
import { StackActions, NavigationActions } from "react-navigation";

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

    console.log("dateRange", dateRange);

    if (balance && movements && dateRange) {
      return (
        <ScrollView
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onRangePicked={onRangePicked.bind(this)}
          ></DateRangePicker>

          <Balance balance={balance} />
        </ScrollView>
      );
    }
  }
}
