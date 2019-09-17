import React from "react";
import { IMovement } from "../components/Movement";
import { IBalance } from "../components/Balance";
import { subDays, isBefore, differenceInHours } from "date-fns";
import { View } from "react-native";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { StackActions, NavigationActions } from "react-navigation";

import AsyncStorage from '@react-native-community/async-storage';
import { UPDATED_KEY, EVICT_ITEMS_THRESHOLD, UNAUTHORIZED, INTERNAL_ERROR } from "../Constants";
import { getFreshMovements, getImportantMovements, calculateBalance, filterMovementsRange, getStoredMovements } from "../BankLogic";












interface IState {
  isLoading: boolean;
  dataReceived: boolean;
  loadingInfo: string;
  movements: IMovement[];
  balance: IBalance;
}

export default class LoadingScreen extends React.PureComponent<{}, IState> {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataReceived: false,
      loadingInfo: "Cargando",
      movements: [],
      balance: undefined
    };
  }

  async componentDidMount() {
    try {

      const { navigation } = this.props;
      const username = navigation.getParam("username", undefined);
      const password = navigation.getParam("password", undefined);

      let fetchFromApi = false

      if (username && password) {
        fetchFromApi = true
      }

      let today = new Date();
      let since = subDays(today, 31);


      let filtered: IMovement[] = [];



      if (fetchFromApi) {
        console.log("GET ITEMS FROM API")
        await AsyncStorage.clear()
        filtered = await getFreshMovements(since, username, password)

        let storageFriendly = filtered.map((value, index) => {
          return [index.toString(), JSON.stringify(value)]
        })
        await AsyncStorage.multiSet(storageFriendly)
        await AsyncStorage.setItem(UPDATED_KEY, JSON.stringify(today))

      } else {
        console.log("GET ITEMS FROM OFFLINE CACHE")
        filtered = await getStoredMovements()
      }

      let mostImportant = getImportantMovements(filtered);

      if (mostImportant) {
        filterMovementsRange(mostImportant, filtered)

        const balance = calculateBalance(
          filtered,
          mostImportant.date,
          today
        );

        this.setState(
          {
            isLoading: false,
            dataReceived: true,
            movements: filtered,
            balance: balance
          },
          () => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Loaded",
                  params: {
                    balance: balance,
                    movements: filtered, 
                    dateRange: {from: mostImportant.date, to: today }
                  }
                })
              ]
            });
            this.props.navigation.dispatch(resetAction);
          }
        );
      }
    } catch (err) {
      // an error occurred
      console.log("error");
      console.log(err);

      if (err === UNAUTHORIZED) {
        this.props.navigation.state.params.onLoginFailed()
        this.props.navigation.goBack()
      } else {
        if (!this.state.dataReceived) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "Error"
              })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }
      }


    } finally {
      //ws.close();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={64} />
        <Title>{this.state.loadingInfo}</Title>
      </View>
    );
  }
}
