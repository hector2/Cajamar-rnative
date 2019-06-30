import React from "react";
import { FlatList } from "react-native";
import Movement, { IMovement } from "../components/Movement";

export default class MovementsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);

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
