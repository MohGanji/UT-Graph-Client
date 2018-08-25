import React from 'react';
import './CreateEvent.css';
import { Header } from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import TitleHolder from '../../Utils/TitleHolder';
import DatePicker from '../../Utils/DatePicker';
import { handleErrors } from '../../Utils/handleErrors'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      beginTime: '',
      endTime: '',
      description: '',
      organizer: this.props.user.username,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBeginTime = this.handleBeginTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleBeginTime(day, month, year) {
    let formattedDay = day < 10 ? day = '0' + day : day;
    let formattedMonth = month < 10 ? month = '0' + month : month;
    let beginTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ beginTime: beginTime });
  }

  handleEndTime(day, month, year) {
    let formattedDay = day < 10 ? day = '0' + day : day;
    let formattedMonth = month < 10 ? month = '0' + month : month;
    let endTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ endTime: endTime });
  }

  handleSubmit() {
    const data = this.state;
    const token = localStorage.getItem('token');

    fetch('/api/v1/event', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ data: data })
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div class="create_event_container1">
          <div class="create_event_title">
            <div class="create_event_title_container" >
              <TitleHolder title="ساخت رویداد" image={pencilImage} />
            </div>
          </div>
          <div class="create_event_container2">
            <div class="create_event_rest_1">
              <div class="create_event_input" >
                <p> نام رویداد: </p>
                <input class="create_event_rest_input" name="title" type="text" onChange={this.handleChange}></input>
              </div>
              <div class="create_event_input" >
                <p> محل برگزاری: </p>
                <input class="create_event_rest_input" name="location" type="text" onChange={this.handleChange} ></input>
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ شروع: </p>
                <DatePicker handleTime={this.handleBeginTime} />
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ پایان: </p>
                <DatePicker handleTime={this.handleEndTime} />
              </div>
              <div class="create_event_input" >
                <p class="input_date"> توضیحات: </p>
                <textarea class="event_text_area" name="description" value={this.state.description} onChange={this.handleChange}>
                </textarea>
              </div>
              <div class="create_event_submit_container">
                <input class="event_page_signup_button" type="submit" onClick={this.handleSubmit} value='ثبت' />
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);