import React from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { UPDATED_KEY, EVICT_ITEMS_THRESHOLD, MAX_ATTEMPTS } from "../Constants";
import { differenceInHours } from "date-fns";
import { StackActions, NavigationActions } from "react-navigation";
import ErrorLogin from "../components/ErrorLogin";



interface IState {
    showLogin: boolean,
    username: string,
    password: string,
    loginAttempts: number
}

export default class LoginScreen extends React.PureComponent<{}, IState> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            username: "",
            password: "",
            loginAttempts: 0
        };
    }

    async componentDidMount() {

        //demo
        await AsyncStorage.clear()

        const lastUpdated: Date = JSON.parse(await AsyncStorage.getItem(UPDATED_KEY))
        console.log(UPDATED_KEY, lastUpdated)

        let today = new Date();
        let hoursLastUpdate = 999
        if (lastUpdated) {
            hoursLastUpdate = differenceInHours(today, lastUpdated)
        }

        console.log("hoursLastUpdate", hoursLastUpdate)
        if (hoursLastUpdate > EVICT_ITEMS_THRESHOLD) {
            this.setState({ showLogin: true })
        }
        else {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Loading"
                    })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onLoginFailed() {
        this.setState(prevState => ({ loginAttempts: prevState.loginAttempts + 1, password: '' }));
    }

    post() {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            console.log("post")
            this.props.navigation.navigate('Loading', { username: this.state.username, password: this.state.password, onLoginFailed: () => {this.onLoginFailed()} })
        }
    }

    render() {

        const loginAttempts = this.state.loginAttempts

        const loginFailedComp = (
            <View style={{ margin: 10 }}>
                <Text>Credenciales incorrectas. Asegúrate de no equivocarte, al siguiente intento fallido se bloqueará el acceso durante 15 minutos. Es por tu seguridad, ya que el banco de Cajamar puede bloquear tu cuenta online después de varios intentos fallidos.</Text>
            </View>
        )

        const loginForm = (
            <View style={{ margin: 10 }}>

                <TextInput onChangeText={((text) => this.setState({ username: text }))} value={this.state.username} style={{ marginTop: 10, textColor: "black" }} label="Nombre de usuario" mode="outlined" />
                <TextInput secureTextEntry={true} onChangeText={((text) => this.setState({ password: text }))} value={this.state.password} style={{ marginTop: 10, textColor: "black" }} label="Contraseña" mode="outlined" />
                <Button
                    style={{ marginTop: 10 }}
                    icon="refresh"
                    mode="contained"
                    dark={true}
                    onPress={() => {
                        this.post()
                    }}
                >
                    Conectarse al banco.
        </Button>

            </View>
        );

        if (this.state.showLogin && loginAttempts === 0) {
            return <View>{loginForm}</View>
        } else if (this.state.showLogin && loginAttempts < MAX_ATTEMPTS) {

            return (
                <View style={{flex: 1, margin: 10}}>
                <ErrorLogin size={100} message="Credenciales incorrectas. Asegúrate de no equivocarte, al siguiente intento fallido se bloqueará el acceso durante 15 minutos. Es por tu seguridad, ya que el banco de Cajamar puede bloquear tu cuenta online después de varios intentos fallidos."></ErrorLogin>
                {loginForm}
                </View>
            )

        } else if (this.state.showLogin && loginAttempts >= MAX_ATTEMPTS) {
            return (<View><ErrorLogin size={200} message="Bloqueadito miarma"></ErrorLogin></View>)
        } else {
            return <View></View>
        }
    }
}
