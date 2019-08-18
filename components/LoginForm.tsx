import React from "react";
import { View } from "react-native";
import { withTheme, TextInput, Button } from "react-native-paper";



interface IProps {
    post: (user: string, password: string) => void
}

interface IState {
    username: string,
    password: string
}


class LoginForm extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""}
    }

    render() {


        return (
            <View style={{ margin: 10 }}>

                <TextInput onChangeText={((text) => this.setState({ username: text }))} value={this.state.username} style={{ marginTop: 10, textColor: "black" }} label="Nombre de usuario" mode="outlined" />
                <TextInput secureTextEntry={true} onChangeText={((text) => this.setState({ password: text }))} value={this.state.password} style={{ marginTop: 10, textColor: "black" }} label="Contraseña" mode="outlined" />
                <Button
                    style={{ marginTop: 10 }}
                    icon="refresh"
                    mode="contained"
                    dark={true}
                    onPress={() => {
                        if (this.state.username.length > 0 && this.state.password.length > 0) {
                            this.props.post(this.state.username, this.state.password)
                        }
                    }}
                >
                    Conectarse al banco.
</Button>

            </View>
        )
    }
}

export default withTheme(LoginForm);
