import React from "react";

import {
  FlatList,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert
} from "react-native";
import Movement, { IMovement } from "../components/Movement";
import { GLOBAL, DemoState } from "../Global";
import Dates from "react-native-dates";
import { isBefore, isAfter, isSameDay } from "date-fns";
import { Button } from "react-native-paper";

import Calendar from "react-native-calendar-select";
import DateRangePicker from "../components/DateRangePicker";
import { StackActions, NavigationActions } from "react-navigation";
import { calculateBalance, getStoredMovements } from "../BankLogic";

interface IState {
  demo: boolean;
}

export default class MovementsScreen extends React.PureComponent<{}, IState> {
  static navigationOptions = {
    title: "Movimientos"
  };

  constructor(props) {
    super(props);
    this.state = { demo: false };
  }

  async componentDidMount() {}

  async onRangePicked(from: Date, to: Date) {
    console.log("picked");
    console.log("from", from);
    console.log("to", to);

    console.log("GET ITEMS FROM OFFLINE CACHE");
    let offlineMovs = await getStoredMovements();

    offlineMovs = offlineMovs.filter(
      x =>
        (isAfter(x.date, from) || isSameDay(x.date, from)) &&
        (isBefore(x.date, to) || isSameDay(x.date, to))
    );

    const balance = calculateBalance(offlineMovs, from, to);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Loaded",
          params: {
            balance: balance,
            movements: offlineMovs,
            dateRange: { from: from, to: to }
          }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    GLOBAL.MovementsState = this;
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);
    const dateRange = navigation.getParam("dateRange", undefined);

    console.log("dateRange", dateRange);

    if (balance && movements && dateRange) {
      return (
        <View style={{ flex: 1 }}>
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onRangePicked={this.onRangePicked.bind(this)}
          ></DateRangePicker>

          <FlatList<IMovement>
            data={movements}
            extraData={this.state.demo}
            style={{ flex: 3 }}
            renderItem={({ item }) => {
              return <Movement mov={item} demo={this.state.demo} />;
            }}
            keyExtractor={({ id }, index) => id}
          />
        </View>
      );
    }
  }
}
