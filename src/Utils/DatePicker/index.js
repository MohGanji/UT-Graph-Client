import React from 'react';
import './style.css';
// import { toast } from 'react-toastify';
import BaseForm from '../BaseForm';
import numberConverter from '../BaseForm/numberConverter';

export default class DatePicker extends BaseForm {
  constructor (props) {
    super(props);
    this.state = {
      day: '',
      month: '',
      year: '',
      p_day: '',
      p_month: '',
      p_year: ''
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  handleDayChange (event) {
    const target = event.target;
    let value = target.value;

    value = numberConverter.toEnglish(value);
    if (value < 0 || value > 31) {
      // toast.error('روز باید بین ۱ تا ۳۱ باشد');
      // } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید')
    } else {
      this.props.handleTime(value, this.state.month, this.state.year);
      this.handleNumberInput(event);
    }
  }

  handleMonthChange (event) {
    const target = event.target;
    let value = target.value;

    value = numberConverter.toEnglish(value);
    if (value < 0 || value > 12) {
      // toast.error('ماه باید بین ۱ تا ۱۲ باشد');
      // } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید')
    } else {
      this.props.handleTime(this.state.day, value, this.state.year);
      this.handleNumberInput(event);
    }
  }

  handleYearChange (event) {
    const target = event.target;
    let value = target.value;

    value = numberConverter.toEnglish(value);
    if (value < 0 || value > 1500) {
      // toast.error('سال باید کوچکتر از ۱۵۰۰ باشد')
      // } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید');
    } else {
      this.props.handleTime(this.state.day, this.state.month, value);
      this.handleNumberInput(event);
    }
  }

  handleTime () {
    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;

    this.props.handleTime(day, month, year);
  }

  render () {
    return (
      <div className="date_picker">
        <input
          className="date_picker_day"
          value={this.state.p_day}
          onChange={this.handleDayChange}
          name="day"
          placeholder="DD"
        />
        /
        <input
          className="date_picker_month"
          value={this.state.p_month}
          onChange={this.handleMonthChange}
          name="month"
          placeholder="MM"
        />
        /
        <input
          className="date_picker_year"
          value={this.state.p_year}
          onChange={this.handleYearChange}
          name="year"
          placeholder="YYYY"
        />
      </div>
    );
  }
}
