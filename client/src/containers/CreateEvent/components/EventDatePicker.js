import "./EventDatePicker.css"
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class EventDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(moment(date).format("YYYY-MM-DD HH:mm"));
  }

  render() {
    const { input, label, meta: { touched, error } } = this.props;

    return (
      <div>
        <label>{label}</label>
        <DatePicker
          {...input}
          dateFormat="LLL"
          selected={
            input.value ? moment(input.value, "YYYY-MM-DD HH:mm") : null
          }
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          popperClassName="datepicker-popper"
        />
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default EventDatePicker;
