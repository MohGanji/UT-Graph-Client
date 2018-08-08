import React from 'react';
import './searchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div class="search">
        <input type="text" class="searchTerm" placeholder="What are you looking for?" />
        {/* <button type="submit" class="searchButton">
        </button> */}
      </div>
    );
  }
}

