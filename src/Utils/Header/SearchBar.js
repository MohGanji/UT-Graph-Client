import React from 'react'
import './searchBar.css'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <div class="search_bar" >
        <form id="search_form">
          <input class="search" type="search" placeholder="نام کاربر یا رویداد را جستجو کنید..." />
        </form>
      </div>

    );
  }
}
