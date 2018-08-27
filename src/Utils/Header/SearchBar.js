import React from 'react'
import './searchBar.css'
import 'font-awesome/css/font-awesome.min.css'
import Select from 'react-select';
import {
  withRouter
} from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      selectedOption: { value: 'رویداد', label: 'رویداد' }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value })
  }

  handleSelect(selectedOption) {
    this.setState({ selectedOption: selectedOption });
  }

  handleSubmit() {
    let selectedOption = this.state.selectedOption.value == 'رویداد' ? 'event' : 'user';
    let keyword = this.state.keyword;
    let url = '/' + 'search' + '/' + selectedOption + '/' + keyword;
    this.props.history.push(url);
  }

  render() {
    let selectOptions = [{ value: 'رویداد', label: 'رویداد' },
    { value: 'کابر', label: 'کاربر' }]


    return (
      <div class="search_bar" >
        <form id="search_form" onSubmit={this.handleSubmit} >
          <input class="search" type="search" placeholder="عبارت مورد نظر خود را وارد کنید..." onChange={this.handleChange} value={this.state.keyword} />
        </form>
        <a class="search_icon" onClick={this.handleSubmit}> <i class="fa fa-search" aria-hidden="true"></i></a>
        <div class="select_container" >
          <Select className="select_custom"
            defaultValue={selectOptions[0]}
            options={selectOptions}
            onChange={this.handleSelect}
            value={this.state.value}
          />
        </div>
      </div>

    );
  }
}

export default withRouter(SearchBar);
