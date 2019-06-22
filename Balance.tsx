import React from "react";
import { Card, CardItem, Body, Text, Icon } from "native-base";
import { format } from "date-fns";

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
            {"Ingresado: " + this.props.balance.positive.toString() + " euros"}
          </Text>
        </CardItem>
        <CardItem>
          <Icon fontSize={32} name="md-thumbs-down" />
          <Text>
            {"Gastado: " + this.props.balance.negative.toString() + " euros"}
          </Text>
        </CardItem>
        <CardItem>
          <Icon fontSize={32} type="FontAwesome" name="balance-scale" />
          <Text style={{ color: totalColor }}>
            {"Total: " + this.props.balance.total.toString() + " euros"}
          </Text>
        </CardItem>
        <CardItem style={{ flex: 1, justifyContent: "center" }} footer bordered>
          <Icon fontSize={32} type="FontAwesome5" name="piggy-bank" />
          <Text style={{ color: totalColor }}>
            {"" + porcentajeAhorro + "%"}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
