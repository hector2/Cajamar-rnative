import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import BalanceScreen from "./BalanceScreen";

import MovementsScreen from "./MovementsScreen";
import { Icon } from "native-base";
import React from "react";
import { theme } from "../ThemeVariables";



const TabNavigator = createMaterialTopTabNavigator(
  {
    Balance: {
      screen: BalanceScreen,
      navigationOptions: {
        tabBarIcon: state => {
          return (
            <Icon
              fontSize={64}
              style={{ width: 64, color: state.tintColor }}
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
            <Icon
              fontSize={64}
              style={{ width: 64, color: state.tintColor }}
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
      activeTintColor: theme.color,
      indicatorStyle: { borderWidth: 2, borderColor: theme.color },
      style: {
        backgroundColor: "white"
      }
    }
  }
);

export default createAppContainer(TabNavigator);
