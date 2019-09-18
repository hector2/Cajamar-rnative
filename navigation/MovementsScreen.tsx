import React from "react";

import { FlatList, View } from "react-native";
import Movement, { IMovement } from "../components/Movement";
import { GLOBAL } from "../Global";
import { isBefore, isAfter, isSameDay } from "date-fns";

import DateRangePicker from "../components/DateRangePicker";
import { StackActions, NavigationActions } from "react-navigation";
import {
  calculateBalance,
  getStoredMovements,
  onRangePicked
} from "../BankLogic";

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
            onRangePicked={onRangePicked.bind(this)}
          ></DateRangePicker>

          <FlatList<IMovement>
            data={movements}
            extraData={this.state.demo}
            style={{ flex: 3 }}
            renderItem={({ item }) => {
              return <Movement mov={item} demo={this.state.demo} />;
            }}
            keyExtractor={({ id }) => id}
          />
        </View>
      );
    }
  }
}
