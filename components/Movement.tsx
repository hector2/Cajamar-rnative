import React from "react";

import { Image, View } from "react-native";
import { format } from "date-fns";
import { theme } from "../ThemeVariables";
import { Text, Surface, withTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { realOrDemo } from "../Global";

interface TransactionEntity {
  name: string;
  uri: string;
  beautyName: string;
}

import namesResolver from '../entities.json';

export interface IMovement {
  id: string;
  date: Date;
  concept: string;
  amount: number;
}

interface MovementProps {
  mov: IMovement;
}

function resolveTransactionEntity(st: string) {
  for (let name of namesResolver) {
    if (st.match(name.name)) {
      return name;
    }
  }

  return {
    name: "Desconocido",
    uri:
      "http://revistalatribuna.com/wp-content/uploads/2018/10/transferencia.jpg",
    beautyName: "Desconocido"
  };
}

class Movement extends React.PureComponent<MovementProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, roundness } = this.props.theme;
    let color = "yellow";

    if (this.props.mov.amount > 0) {
      color = "green";
    } else if (this.props.mov.amount < 0) {
      color = "red";
    }

    let beautyEntity = resolveTransactionEntity(this.props.mov.concept);

    return (
      <Surface
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: roundness,
          elevation: 5,
          margin: 5,
          padding: 5
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: beautyEntity.uri }}
          style={{
            height: 64,
            width: 64,
            margin: 10,

            borderRadius: roundness,
            borderColor: "black",
            alignSelf: "stretch"
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          <Text>
            {beautyEntity.beautyName === "Desconocido"
              ? this.props.mov.concept
              : beautyEntity.beautyName}
          </Text>
          <Text style={{ color: color, fontWeight: "bold" }}>
            {realOrDemo(this.props.mov.amount.toString()) + "€"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderTopRightRadius: roundness,
            borderBottomRightRadius: roundness
          }}
        >
          <Icon
            size={32}
            style={{ color: "gray" }}
            name="calendar"
          />
          <Text style={{ color: "gray" }}>
            {format(this.props.mov.date, "DD/MM")}
          </Text>
        </View>
      </Surface>
    );
  }
}

export default withTheme(Movement);
