import React from 'react';
import './UserSearch.css'
import { Header } from '../../Utils/Header';
import { handleErrors } from '../../Utils/handleErrors'
import UserBox from '../../Utils/UserBox';
import Footer from '../../Utils/Footer';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    let that = this;
    let keyword = this.props.match.params.keyword;

    fetch(`/api/v1/user/search/${keyword}`)
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        that.setState({ users: responseJson.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const searchEvents = this.state.users.map((user) => <UserBox user={user} />);
    return (
      <div>
        <Header />
        <div class="search_page_container">
          <div class="search_page_title">
            <p>نتیجه جستجو:</p>
          </div>
          <div class="home_new_events_container search_page_results_container">
            {searchEvents}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}