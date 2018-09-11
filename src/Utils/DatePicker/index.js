import React from 'react'
import './style.css'
import { toast } from 'react-toastify'

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: '',
      month: '',
      year: '',
    }
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleTime = this.handleTime.bind(this)
  }

  handleDayChange(event) {
    const target = event.target
    let value = target.value

    if (value < 0 || value > 31) {
      // toast.error('روز باید بین ۱ تا ۳۱ باشد');
    } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید')
    } else {
      this.props.handleTime(value, this.state.month, this.state.year)
      this.setState({ day: value })
    }
  }

  handleMonthChange(event) {
    const target = event.target
    let value = target.value

    if (value < 0 || value > 12) {
      // toast.error('ماه باید بین ۱ تا ۱۲ باشد');
    } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید')
    } else {
      this.props.handleTime(this.state.day, value, this.state.year)
      this.setState({ month: value })
    }
  }

  handleYearChange(event) {
    const target = event.target
    const value = target.value

    if (value < 0 || value > 1500) {
      // toast.error('سال باید کوچکتر از ۱۵۰۰ باشد')
    } else if (isNaN(value)) {
      // toast.error('لطفا ورودی عددی وارد کنید');
    } else {
      this.props.handleTime(this.state.day, this.state.month, value)
      this.setState({ year: value })
    }
  }

  handleTime() {
    let day = this.state.day
    let month = this.state.month
    let year = this.state.year

    this.props.handleTime(day, month, year)
  }

  render() {
    return (
      <div class="date_picker">
        <input
          class="date_picker_day"
          value={this.state.day}
          onChange={this.handleDayChange}
          placeholder="DD"
        />
        /
        <input
          class="date_picker_month"
          value={this.state.month}
          onChange={this.handleMonthChange}
          placeholder="MM"
        />
        /
        <input
          class="date_picker_year"
          value={this.state.year}
          onChange={this.handleYearChange}
          placeholder="YYYY"
        />
      </div>
    )
  }
}
