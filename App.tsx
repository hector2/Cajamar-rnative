import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";

import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";
import React, { Component } from "react";
import { IMovement } from "./components/Movement";
import { IBalance } from "./components/Balance";
import { subDays, isBefore } from "date-fns";
import {
  Container,
  Content,
  Spinner,
  Text,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Header,
  Root,
  View
} from "native-base";

import { theme } from "./ThemeVariables";

const AppCont = createAppContainer(AppNavigator);

interface StateLoad {
  loading: boolean;
}

export default class App extends Component<{}, StateLoad> {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <View>
          <Text>Cargandooooooo</Text>
        </View>
      );
    }

    return <AppCont />;
  }
}
