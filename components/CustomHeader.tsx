import React from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "react-navigation";
import { toggleDemo } from "../Global";

export default class CustomHeader extends React.Component {
  _goBack = () => console.log("Went back");

  _onSearch = () => console.log("Searching");

  _onMore = () => toggleDemo();

  render() {
    return (
      <Appbar.Header>
        <Appbar.Content
          titleStyle={{ color: "white" }}
          title="Title"
          subtitle="Subtitle"
          subtitleStyle={{ color: "white" }}
        />
        <Appbar.Action icon="search" onPress={this._onSearch} />
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>
    );
  }
}
