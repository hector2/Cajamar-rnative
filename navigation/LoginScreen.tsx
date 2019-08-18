import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { UPDATED_KEY, EVICT_ITEMS_THRESHOLD, MAX_ATTEMPTS } from "../Constants";
import { differenceInHours } from "date-fns";
import { StackActions, NavigationActions } from "react-navigation";
import ErrorLogin from "../components/ErrorLogin";
import LoginForm from "../components/LoginForm";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


interface IState {
    showLogin: boolean,
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
        this.setState(prevState => ({ loginAttempts: prevState.loginAttempts + 1 }));
    }

    post(username, pass) {
        console.log("post")
        this.props.navigation.navigate('Loading', { username: username, password: pass, onLoginFailed: () => { this.onLoginFailed() } })
    }

    render() {

        const loginAttempts = this.state.loginAttempts

        if (this.state.showLogin && loginAttempts === 0) {
            return (
                <KeyboardAwareScrollView extraHeight={50} enableOnAndroid={true}>
                    <LoginForm post={this.post.bind(this)}></LoginForm>
                </KeyboardAwareScrollView>
            )
        } else if (this.state.showLogin && loginAttempts < MAX_ATTEMPTS) {

            return (
                <KeyboardAwareScrollView extraHeight={50} enableOnAndroid={true}>
                    <ErrorLogin size={100} message="Credenciales incorrectas. Asegúrate de no equivocarte, al siguiente intento fallido se bloqueará el acceso durante 15 minutos. Es por tu seguridad, ya que el banco de Cajamar puede bloquear tu cuenta online después de varios intentos fallidos."></ErrorLogin>
                    <LoginForm post={this.post.bind(this)}></LoginForm>
                </KeyboardAwareScrollView>
            )

        } else if (this.state.showLogin && loginAttempts >= MAX_ATTEMPTS) {
            return (<View><ErrorLogin size={200} message="Bloqueadito miarma"></ErrorLogin></View>)
        } else {
            return <View></View>
        }
    }
}
