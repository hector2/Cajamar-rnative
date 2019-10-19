import React from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "react-navigation";
import { toggleDemo, GLOBAL, realOrDemoIcon } from "../Global";

interface IState {
  toggle: boolean;
}

export default class CustomHeader extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = { toggle: false };
  }

  _goBack = () => console.log("Went back");

  _onSearch = () => console.log("Searching");

  _onMore = () => toggleDemo();

  render() {
    GLOBAL.HeaderState = this;
    return (
      <Appbar.Header>
        <Appbar.Content
          titleStyle={{ color: "white" }}
          title="Cajamar App"
          subtitleStyle={{ color: "white" }}
        />
        <Appbar.Action icon="search-web" onPress={this._onSearch} />
        <Appbar.Action icon={realOrDemoIcon()} onPress={this._onMore} />
      </Appbar.Header>
    );
  }
}
