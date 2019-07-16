import React from "react";
import { FlatList } from "react-native";
import Movement, { IMovement } from "../components/Movement";
import { GLOBAL, DemoState } from "../Global";

export default class MovementsScreen extends React.PureComponent<
  {},
  DemoState
> {
  static navigationOptions = {
    title: "Movimientos"
  };
  constructor(props) {
    super(props);
    this.state = { demo: false };
  }

  async componentDidMount() {}

  render() {
    GLOBAL.MovementsState = this;
    const { navigation } = this.props;
    const balance = navigation.getParam("balance", undefined);
    const movements = navigation.getParam("movements", undefined);

    if (balance && movements) {
      return (
        <FlatList<IMovement>
          data={movements}
          extraData={this.state.demo}
          renderItem={({ item }) => {
            return <Movement mov={item} demo={this.state.demo} />;
          }}
          keyExtractor={({ id }, index) => id}
        />
      );
    }
  }
}
