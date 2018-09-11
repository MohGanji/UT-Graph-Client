import React from 'react'
import numberConverter from './numberConverter'
import isPersianString from '../functions/isPersianString'

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleNumberInput = this.handleNumberInput.bind(this)
    this.handlePersianInput = this.handlePersianInput.bind(this)
  }
  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleNumberInput(event) {
    const target = event.target
    let value = target.value
    const name = target.name
    const persian_name = 'p_' + name

    value = numberConverter.toEnglish(value)
    let persian_value = numberConverter.toPersian(value)
    this.setState({
      [name]: value,
      [persian_name]: persian_value,
    })
  }

  handlePersianInput(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    // console.log(this.state.firstName)
    if (isPersianString(value)) {
      console.log(value)
      this.setState({
        [name]: value,
      })
    }
  }
}
