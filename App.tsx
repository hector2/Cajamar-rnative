// At the top of your file
import * as Font from "expo-font";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";


import React from "react";
import { FlatList } from "react-native";

import { Container, Content, Text, Spinner } from "native-base";
import { subDays, isBefore } from "date-fns";
import Movement, { IMovement } from "./Movement";
import Balance, { IBalance } from "./Balance";

interface IState {
  isLoading: boolean;
  loadingInfo: string;
  movements: IMovement[];
  balance: IBalance;
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getImportantMovements(coll: IMovement[]) {
  let valueIngreso = 0;
  let valuePago = 0;

  let masBeneficiosos = coll
    .filter(mov => mov.amount > 0)
    .sort((a, b) => a.amount - b.amount);

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

  //TODO segun la estrategia
  if (masMalos.length > 0) {
    return masMalos[0];
  }
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

export default class MyApp extends React.PureComponent<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: "Cargando",
      isLoading: true,
      movements: [],
      balance: {
        total: 0.0,
        positive: 0.0,
        negative: 0.0,
        from: undefined,
        to: undefined
      }
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
      ...FontAwesome5.font
    });
    try {
      var ws = new WebSocket("ws://cajamar-scrapper.herokuapp.com");

      ws.onopen = () => {
        // connection opened
        //ws.send("something"); // send a message
      };

      ws.onmessage = e => {
        if (IsJsonString(e.data)) {
          console.log("AHORA EMPIEZO A PARSEAR");
          let json = JSON.parse(e.data);
          let today = new Date();
          let since = subDays(today, 31);

          console.log(since);

          let filtered: IMovement[] = [];

          for (let mov of json) {
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
              filtered.push(movement);
            }
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
                movements: filtered,
                balance: balance
              },
              function() {}
            );
          }
        } else {
          this.setState({ loadingInfo: e.data });
        }
      };

      ws.onerror = e => {
        // an error occurred
        console.log("error websocket");
        //console.log(e);
      };

      ws.onclose = e => {
        // connection closed
        //console.log(e.code, e.reason);
      };
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Content
            contentContainerStyle={{
              flex: 1,
              padding: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner size={64} color="red" />
            <Text>{this.state.loadingInfo}</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content
          contentContainerStyle={{
            marginTop: 20,
            flex: 1,
            padding: 5,
            justifyContent: "center"
          }}
        >
          <Balance balance={this.state.balance} />

          <FlatList<IMovement>
            data={this.state.movements}
            renderItem={({ item }) => {
              return <Movement mov={item} />;
            }}
            keyExtractor={({ id }, index) => id}
          />
        </Content>
      </Container>
    );
  }
}
