import React from "react";
import { View, Image } from "react-native";
import { Title, withTheme, Button, Text } from "react-native-paper";
import { StackActions, NavigationActions } from "react-navigation";
const sadPiggy = require("../assets/bankrupt.png");

class ErrorScreen extends React.PureComponent<{}, {}> {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { colors, roundness } = this.props.theme;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20
        }}
      >
        <Title>Ha ocurrido un error</Title>

        <Image
          resizeMode="contain"
          source={sadPiggy}
          style={{
            height: 200,
            width: 200,
            alignSelf: "center"
          }}
        />

        <Text>
          No se ha podido obtener la información más reciente de tu banco.
          ¿Quieres intentarlo de nuevo?
        </Text>

        <Button
          icon="refresh"
          mode="contained"
          dark={true}
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Loading"
                })
              ]
            });
            this.props.navigation.dispatch(resetAction);
          }}
        >
          Reintentar
        </Button>
      </View>
    );
  }
}

export default withTheme(ErrorScreen);
