import React from "react";
import { Modal, View, TouchableHighlight, Text } from "react-native";
import Dates from "react-native-dates";
import { isBefore, format } from "date-fns";
import { withTheme } from "react-native-paper";
import moment from "moment";

interface DateRangePickerProps {
  from: Date;
  to: Date;
  onRangePicked: (from: Date, to: Date) => void;
}

interface DateRangePickerState {
  startDate: Date;
  endDate: Date;
  focus: string;
  modalVisible: boolean;
}

class DateRangePicker extends React.PureComponent<
  DateRangePickerProps,
  DateRangePickerState
> {
  constructor(props) {
    super(props);

    this.state = {
      focus: "endDate",
      startDate: this.props.from,
      endDate: this.props.to,
      modalVisible: false
    };
  }

  finishPick = () => {
    this.setState({ modalVisible: false }, () => {
      if (
        this.state.startDate &&
        this.state.endDate &&
        isBefore(this.state.startDate, this.state.endDate)
      ) {
        this.props.onRangePicked(this.state.startDate, this.state.endDate);
      } else {
        this.props.onRangePicked(this.props.from, this.props.to);
      }
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const isDateBlocked = date => !date.isBefore(moment(), "day");

    const onDatesChange = ({ startDate, endDate, focusedInput }) => {
      if (moment.isMoment(startDate) || moment.isMoment(endDate)) {
        let dateStart = moment.isMoment(startDate)
          ? startDate.toDate()
          : this.state.startDate;
        let dateEnd = moment.isMoment(endDate)
          ? endDate.toDate()
          : this.state.endDate;

        console.log("ONDATESCHANGE");
        console.log("dateStart", dateStart.toString());
        console.log("dateEnd", dateEnd.toString());
        console.log("focusedInput", focusedInput);
        console.log("-------------------------------------------");

        this.setState({ ...this.state, focus: focusedInput }, () =>
          this.setState({
            startDate: dateStart,
            endDate: dateEnd
          })
        );
      }
    };

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.finishPick}
        >
          <View style={{ flex: 1 }}>
            <View>
              <Dates
                onDatesChange={onDatesChange}
                isDateBlocked={isDateBlocked}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                focusedInput={this.state.focus}
                focusedMonth={moment(this.state.endDate)}
                range
              />

              <TouchableHighlight onPress={this.finishPick}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {format(this.state.startDate, "DD/MM/YY") +
              " - " +
              format(this.state.endDate, "DD/MM/YY")}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default withTheme(DateRangePicker);
