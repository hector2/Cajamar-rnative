import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { UPDATED_KEY, EVICT_ITEMS_THRESHOLD } from "../Constants";
import { differenceInHours } from "date-fns";
import { StackActions, NavigationActions } from "react-navigation";



interface IState {
    showLogin: boolean,
    username: string,
    password: string
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
            password: ""
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

    post() {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            console.log("post")
            this.props.navigation.navigate('Loading', {username: this.state.username, password: this.state.password})
        }
    }

    render() {
        if (this.state.showLogin) {
            return (
                <View style={{ margin: 10 }}>
                    <TextInput onChangeText={((text) => this.setState({ username: text }))} value={this.state.username} style={{ marginTop: 10, textColor: "black" }} label="Nombre de usuario" mode="outlined" />
                    <TextInput onChangeText={((text) => this.setState({ password: text }))} value={this.state.password} style={{ marginTop: 10, textColor: "black" }} label="Contraseña" mode="outlined" />
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
        } else {
            return <View></View>
        }
    }
}
