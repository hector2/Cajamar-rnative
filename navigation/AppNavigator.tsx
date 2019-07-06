import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import BalanceScreen from "./BalanceScreen";

import MovementsScreen from "./MovementsScreen";

import React from "react";
import { theme } from "../ThemeVariables";

import LoadingScreen from "./LoadingScreen";
import CustomHeader from "../components/CustomHeader";
import ErrorScreen from "./ErrorScreen";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Balance: {
      screen: BalanceScreen,
      navigationOptions: {
        tabBarIcon: state => {
          return (
            <MaterialCommunityIcons
              size={48}
              style={{ width: 48, color: state.tintColor }}
              color={state.tintColor}
              type="MaterialCommunityIcons"
              name="scale-balance"
            />
          );
        }
      }
    },
    Movimientos: {
      screen: MovementsScreen,
      navigationOptions: {
        tabBarIcon: state => {
          return (
            <MaterialCommunityIcons
              size={48}
              style={{ width: 48, color: state.tintColor }}
              color={state.tintColor}
              type="MaterialCommunityIcons"
              name="bank-transfer"
            />
          );
        }
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveTintColor: "black",
      activeTintColor: theme.primary,
      indicatorStyle: {
        borderWidth: 2,
        borderColor: theme.primary
      },
      style: {
        backgroundColor: "white"
      }
    }
  }
);

const RootStack = createStackNavigator(
  { Loading: LoadingScreen, Error: ErrorScreen, Loaded: TabNavigator },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: <CustomHeader />
      };
    }
  }
);

export default createAppContainer(RootStack);
