import React from "react";
import { FlatList } from "react-native";
import Movement, { IMovement } from "../components/Movement";

export default class MovementsScreen extends React.PureComponent {
  static navigationOptions = {
    title: "Movimientos"
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);

    console.log("movements", movements);

    if (balance && movements) {
      return (
        <FlatList<IMovement>
          data={movements}
          renderItem={({ item }) => {
            return <Movement mov={item} />;
          }}
          keyExtractor={({ id }, index) => id}
        />
      );
    }
  }
}
