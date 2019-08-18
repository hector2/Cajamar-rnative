import React from "react";
import { Image } from "react-native";
import { withTheme, Card, Paragraph } from "react-native-paper";

const sadPiggy = require("../assets/bankrupt.png");

interface ErrorLoginProps {
    message: string;
    size: number
}



class ErrorLogin extends React.PureComponent<ErrorLoginProps, {}> {
    constructor(props) {
      super(props);
    }
  
    render() {
      const { colors } = this.props.theme;
      let resImage = sadPiggy;
      let message = this.props.message
  
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
              height: this.props.size,
              width: this.props.size,
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
  
  export default withTheme(ErrorLogin);
  