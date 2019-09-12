import React from "react";
import { IMovement } from "../components/Movement";
import { IBalance } from "../components/Balance";
import { subDays, isBefore, differenceInHours } from "date-fns";
import { View } from "react-native";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { StackActions, NavigationActions } from "react-navigation";

import AsyncStorage from '@react-native-community/async-storage';
import { UPDATED_KEY, EVICT_ITEMS_THRESHOLD, UNAUTHORIZED, INTERNAL_ERROR } from "../Constants";








function getImportantMovements(coll: IMovement[]) {
  let masBeneficiosos = coll
    .filter(mov => mov.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (masBeneficiosos.length > 1) {
    masBeneficiosos = masBeneficiosos.slice(0, 1);
  }

  let masMalos = coll
    .filter(mov => mov.amount < 0)
    .sort((a, b) => a.amount - b.amount);

  if (masMalos.length > 1) {
    masMalos = masMalos.slice(0, 1);
  }

  console.log("masbeneficiosos");
  console.log(masBeneficiosos);

  console.log("masmalos");
  console.log(masMalos);

  if (masBeneficiosos.length > 0 && masMalos.length === 0) {
    return masBeneficiosos[0]
  } else if (masMalos.length > 0 && masBeneficiosos.length === 0) {
    return masMalos[0];
  } else if (masMalos.length > 0 && masBeneficiosos.length > 0) {
    let masBien = masBeneficiosos[0]
    let masMal = masMalos[0]
    return isBefore(masBien.date, masMal.date) ? masBien : masMal
  } else {
    throw "No movements"
  }
}


async function getStoredMovements() {
  let movements: IMovement[] = []
  let movKeys = await AsyncStorage.getAllKeys()
  movKeys = movKeys.filter((v) => v !== UPDATED_KEY)

  console.log("claves", movKeys)

  let keyvalues = await AsyncStorage.multiGet(movKeys)

  console.log("keyvalues", keyvalues)

  keyvalues.map((v) => v[1]).forEach((v) => {
    let parsed = JSON.parse(v)

    console.log("compare parsed and final", parsed.date, new Date(parsed.date))

    let mov: IMovement = {
      id: parsed.id,
      date: new Date(parsed.date),
      concept: parsed.concept,
      amount: parsed.amount
    }
    movements.push(mov)
  })

  console.log("movements offline", movements)

  movements = movements.sort((a, b) => b.date.getTime() - a.date.getTime())

  console.log("movements sorted", movements)

  return movements
}

async function getFreshMovements(since: Date, username: string, password: string) {

  const movements: IMovement[] = []
  let response = await fetch(
    'https://xwhzp8zwv9.execute-api.eu-west-3.amazonaws.com/dev/scrap',
    {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  let responseJson = await response.json();

  if (responseJson.statusCode === UNAUTHORIZED) {
    throw UNAUTHORIZED
  } else if (responseJson.statusCode === INTERNAL_ERROR) {
    throw INTERNAL_ERROR
  }

  console.log("since", since);

  responseJson = responseJson.content


  for (let mov of responseJson) {
    let parts = mov.date.split("/");
    let fechamov = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]) + 1
    );

    fechamov.setHours(0);
    fechamov.setMinutes(0);
    fechamov.setSeconds(0);
    fechamov.setMilliseconds(0);

    if (isBefore(since, fechamov)) {
      let movement: IMovement = {
        id: mov.id,
        date: fechamov,
        concept: mov.concept,
        amount: mov.amount
      };
      movements.push(movement);
    }
  }

  return movements
}

function calculateBalance(coll: IMovement[], from: Date, to: Date): IBalance {
  let positivo = 0.0;
  let negativo = 0.0;

  for (let mov of coll) {
    let value = mov.amount;
    if (value >= 0) {
      positivo += value;
      positivo = +positivo.toFixed(2);
    } else {
      negativo += value;
      negativo = +negativo.toFixed(2);
    }
  }

  return {
    positive: positivo,
    negative: negativo,
    total: +(positivo + negativo).toFixed(2),
    from: from,
    to: to
  };
}



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
        let index = filtered.indexOf(mostImportant);
        if (index < filtered.length - 1 && index !== -1) {
          filtered = filtered.slice(0, index + 1);
        }

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
                    movements: filtered
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
