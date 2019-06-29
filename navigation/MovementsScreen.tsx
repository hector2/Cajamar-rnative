import React from "react";
import { FlatList } from "react-native";
import Movement, { IMovement } from "../components/Movement";

export default class MovementsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    if (this.props.screenProps.balance && this.props.screenProps.movements) {
      return (
        <FlatList<IMovement>
          data={this.props.screenProps.movements}
          renderItem={({ item }) => {
            return <Movement mov={item} />;
          }}
          keyExtractor={({ id }, index) => id}
        />
      );
    }
  }
}
