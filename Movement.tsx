import React from "react";

import { Card, CardItem, Icon, Right, Text } from "native-base";
import { format } from "date-fns";

export interface IMovement {
  id: string;
  date: Date;
  concept: string;
  amount: number;
}

interface MovementProps {
  mov: IMovement;
}

export default class Movement extends React.PureComponent<MovementProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let iconName = "trending-neutral";
    let color = "yellow";

    if (this.props.mov.amount > 0) {
      iconName = "trending-up";
      color = "green";
    } else if (this.props.mov.amount < 0) {
      iconName = "trending-down";
      color = "red";
    }

    return (
      <Card style={{ borderRadius: 45 }}>
        <CardItem>
          <Icon style={{ fontSize: 30, color: color }} name={iconName} />
          <Text style={{ color: color }}>
            {this.props.mov.amount.toString()}
          </Text>
          <Right>
            <Text>{format(this.props.mov.date, "DD/MM/YYYY")}</Text>
          </Right>
        </CardItem>

        <CardItem>
          <Text>{this.props.mov.concept}</Text>
        </CardItem>
      </Card>
    );
  }
}
