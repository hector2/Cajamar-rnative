import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card, CardItem, Text, Icon, View, Content } from "native-base";
import { format } from "date-fns";
import { theme } from "../ThemeVariables";

const happyPiggy = require("../assets/piggy-bank.png");
const sadPiggy = require("../assets/bankrupt.png");

interface BalanceProps {
  balance: IBalance;
}

interface ResultadoBalanceProps {
  ahorro: string;
}

export interface IBalance {
  from: Date;
  to: Date;
  total: number;
  positive: number;
  negative: number;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center"
  }
});

class ResultadoBalance extends React.PureComponent<ResultadoBalanceProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let resImage = happyPiggy;
    let message =
      "¡Genial! Has conseguido ahorrar un " +
      this.props.ahorro +
      "% de tus ingresos.";

    if (parseFloat(this.props.ahorro) < 30) {
      resImage = sadPiggy;
      message =
        "Pffff estás más pelado que el sobaco de una muñeca. Llevas ahorrado un " +
        this.props.ahorro +
        "% de tus ingresos.";
    }

    return (
      <Card
        style={{
          borderRadius: theme.radiusCard,
          backgroundColor: theme.color,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          resizeMode="contain"
          source={resImage}
          style={{
            height: 200,
            width: 200,
            margin: 10,
            borderRadius: theme.radiusCard
          }}
        />
        <Text
          uppercase
          style={{ color: "white", textAlign: "center", margin: 10 }}
        >
          {message}
        </Text>
      </Card>
    );
  }
}

export default class Balance extends React.PureComponent<BalanceProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let totalColor = this.props.balance.total > 0 ? "green" : "red";

    let porcentajeAhorro = (
      (this.props.balance.total * 100) /
      this.props.balance.positive
    ).toFixed(2);

    return (
      <Content>
        <Card
          style={{
            borderRadius: theme.radiusCard
          }}
        >
          <CardItem
            header
            bordered
            style={[
              {
                borderTopLeftRadius: theme.radiusCard,
                borderTopRightRadius: theme.radiusCard,
                backgroundColor: theme.color
              },
              styles.centered
            ]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Balance total
            </Text>
          </CardItem>
          <CardItem>
            <Icon fontSize={32} name="md-calendar" />
            <Text>
              {"" +
                format(this.props.balance.from, "DD/MM/YYYY") +
                " a " +
                format(this.props.balance.to, "DD/MM/YYYY")}
            </Text>
          </CardItem>
          <CardItem>
            <Icon fontSize={32} name="md-thumbs-up" />
            <Text>
              {"Ingresado: " + this.props.balance.positive.toString() + "€"}
            </Text>
          </CardItem>
          <CardItem>
            <Icon fontSize={32} name="md-thumbs-down" />
            <Text>
              {"Gastado: " + this.props.balance.negative.toString() + "€"}
            </Text>
          </CardItem>
          <CardItem
            footer
            style={[
              {
                borderBottomLeftRadius: theme.radiusCard,
                borderBottomRightRadius: theme.radiusCard,
                marginBottom: 10
              }
            ]}
          >
            <Icon fontSize={32} type="FontAwesome" name="balance-scale" />
            <Text style={{ color: totalColor }}>
              {"Total: " + this.props.balance.total.toString() + "€"}
            </Text>
          </CardItem>
        </Card>
        <ResultadoBalance ahorro={porcentajeAhorro} />
      </Content>
    );
  }
}
