import React from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.min.css'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../../../Utils/BaseForm'
import { ToastContainer, toast } from 'react-toastify'

class SearchBar extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      selectedOption: { value: 'رویداد', label: 'رویداد' },
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedOption) {
    this.setState({ selectedOption: selectedOption })
  }

  handleSubmit() {
    if (this.state.keyword.length < 2) {
      toast.error('طول عبارت باید حداقل دو باشد')
      return
    } else {
      let selectedOption =
        this.state.selectedOption.value == 'رویداد' ? 'event' : 'user'
      let keyword = this.state.keyword
      let url = '/' + 'search' + '/' + selectedOption + '/' + keyword
      this.props.history.push(url)
    }
  }

  render() {
    let selectOptions = [
      { value: 'رویداد', label: 'رویداد' },
      { value: 'کابر', label: 'کاربر' },
    ]

    return (
      <div class="search_bar">
        {/* <ToastContainer /> */}
        <form id="search_form" onSubmit={this.handleSubmit}>
          <input
            class="search"
            type="search"
            placeholder="عبارت مورد نظر خود را وارد کنید..."
            onChange={this.handleChange}
            value={this.state.keyword}
            name="keyword"
          />
        </form>
        <a class="search_icon" onClick={this.handleSubmit}>
          {' '}
          <i class="fa fa-search" aria-hidden="true" />
        </a>
        <div class="select_container">
          <Select
            className="select_custom"
            defaultValue={selectOptions[0]}
            options={selectOptions}
            onChange={this.handleSelect}
            value={this.state.value}
            isSearchable={false}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(SearchBar)
