// At the top of your file
import * as Font from "expo-font";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import React from "react";
import { FlatList } from "react-native";
import { iOSColors } from "react-native-typography";

import {
  Container,
  Content,
  Text,
  Spinner,
  Header,
  Left,
  Title,
  Body,
  Button,
  Icon
} from "native-base";
import Movement, { IMovement } from "./Movement";
import Balance from "./Balance";

export default class BalanceScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    let bg = iOSColors.red;

    if (this.props.screenProps.balance && this.props.screenProps.movements) {
      return <Balance balance={this.props.screenProps.balance} />;
    }
  }
}
