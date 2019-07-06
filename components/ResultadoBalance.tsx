import React from "react";
import { Image } from "react-native";
import { withTheme, Card, Paragraph } from "react-native-paper";

const happyPiggy = require("../assets/piggy-bank.png");
const sadPiggy = require("../assets/bankrupt.png");

interface ResultadoBalanceProps {
  ahorro: string;
}

class ResultadoBalance extends React.PureComponent<ResultadoBalanceProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, roundness } = this.props.theme;
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
        elevation={5}
        style={{
          backgroundColor: colors.primary,
          margin: 5,
          padding: 5
        }}
      >
        <Image
          resizeMode="contain"
          source={resImage}
          style={{
            height: 200,
            width: 200,
            alignSelf: "center"
          }}
        />

        <Card.Content>
          <Paragraph
            style={{ color: "white", textAlign: "center", margin: 10 }}
          >
            {message}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default withTheme(ResultadoBalance);
