import React from 'react'
import numberConverter from './numberConverter'

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleNumberInput = this.handleNumberInput.bind(this)
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

    value = numberConverter.toEnglish(value)
    this.setState({
      [name]: value,
    })
  }
}
