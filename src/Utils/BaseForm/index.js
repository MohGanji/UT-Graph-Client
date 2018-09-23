import React from 'react';
import numberConverter from './numberConverter';
import isPersianString from '../functions/isPersianString';
import isEnglishString from '../functions/isEnglishString';

export default class BaseForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleLanguageInput = this.handleLanguageInput.bind(this);
  }
  handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleNumberInput (event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    const persianName = 'p_' + name;
    let warnings = this.state.warnings;
    let numberInEnglish = numberConverter.toEnglish(value);

    if (value !== '' && numberInEnglish === '') {
      warnings[name] = true;
      this.setState({ warnings: warnings });
    } else {
      let persianValue = numberConverter.toPersian(numberInEnglish);
      warnings[name] = false;
      this.setState({
        [name]: numberInEnglish,
        [persianName]: persianValue,
        warnings: warnings
      });
    }
  }

  handleLanguageInput (language, event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let warnings = this.state.warnings;
    let isInLanguage;
    if (language === 'persian') {
      isInLanguage = isPersianString;
    } else if (language === 'english') {
      isInLanguage = isEnglishString;
    }
    if (isInLanguage(value)) {
      warnings[name] = false;
      this.setState({
        [name]: value,
        warnings: warnings
      });
    } else {
      warnings[name] = true;
      this.setState({ warnings: warnings });
    }
  }
}
