import React from "react";
import { View, Dimensions } from "react-native";
import {
  withTheme,
  TextInput,
  Button,
  Surface,
  HelperText,
  Headline,
  Title
} from "react-native-paper";

interface IProps {
  post: (user: string, password: string) => void;
}

interface IState {
  username: string;
  password: string;
}

class LoginForm extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  render() {
    const { colors, roundness } = this.props.theme;
    const { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          height: height,
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 1 }}>
          <Headline>Cajamar</Headline>
        </View>

        <Surface
          style={{
            flex: 2,
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: roundness,
            elevation: 5,
            margin: 5,
            padding: 5
          }}
        >
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            style={{
              textColor: "black",
              backgroundColor: "white"
            }}
            label="Nombre de usuario"
            theme={{ roundness: 0 }}
          />
          <HelperText type="error" visible={this.state.username.length === 0}>
            Este campo es obligatorio
          </HelperText>
          <TextInput
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            style={{
              marginTop: 10,
              textColor: "black",
              backgroundColor: "white"
            }}
            label="Contraseña"
            theme={{ roundness: 0 }}
          />
          <HelperText type="error" visible={this.state.password.length === 0}>
            Este campo es obligatorio
          </HelperText>
          <Button
            style={{ marginTop: 10 }}
            icon="refresh"
            mode="contained"
            dark={true}
            onPress={() => {
              if (
                this.state.username.length > 0 &&
                this.state.password.length > 0
              ) {
                this.props.post(this.state.username, this.state.password);
              }
            }}
          >
            Conectarse al banco.
          </Button>
        </Surface>
        <View style={{ flex: 1 }}>
          <Headline>Esto sería el footer</Headline>
        </View>
      </View>
    );
  }
}

export default withTheme(LoginForm);
