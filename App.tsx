import * as Font from "expo-font";

import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";
import React, { Component } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { View, Text } from "react-native";
import { iOSColors } from "react-native-typography";
import { theme } from "./ThemeVariables";

const ThemeConstants = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    accent: "yellow"
  },
  roundness: 30
};

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
    /*
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });*/

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

    return (
      <PaperProvider theme={ThemeConstants}>
        <AppCont />
      </PaperProvider>
    );
  }
}
