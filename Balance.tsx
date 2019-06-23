import React from "react";
import { Card, CardItem, Text, Icon } from "native-base";
import { format } from "date-fns";
import SvgUri from "react-native-svg-uri";

interface BalanceProps {
  balance: IBalance;
}

export interface IBalance {
  from: Date;
  to: Date;
  total: number;
  positive: number;
  negative: number;
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
      <Card>
        <CardItem style={{ flex: 1, justifyContent: "center" }} header bordered>
          <Text>Balance total</Text>
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
        <CardItem>
          <Icon fontSize={32} type="FontAwesome" name="balance-scale" />
          <Text style={{ color: totalColor }}>
            {"Total: " + this.props.balance.total.toString() + "€"}
          </Text>
        </CardItem>
        <CardItem footer bordered>
          <SvgUri
            width="32"
            height="32"
            source={{
              uri: "https://www.svgrepo.com/show/31409/piggy-bank-with-coin.svg"
            }}
          />
          <Text style={{ color: totalColor }}>
            {"" + porcentajeAhorro + "%"}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
