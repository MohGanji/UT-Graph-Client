import React from 'react';
import './CreateEvent.css';
import Header from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import TitleHolder from '../../Utils/TitleHolder';
import DatePicker from '../../Utils/DatePicker';
import handleErrors from '../../Utils/functions/handleErrors';
import { connect } from 'react-redux';
import TextArea from './TextArea';
import Footer from '../../Utils/Footer';
import { Redirect } from 'react-router-dom';
import prof_pic from '../../images/background.jpg';
import { toast } from 'react-toastify';


import axios from 'axios';
var path = require('path');

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
      redirect: false,
      image: prof_pic,
      file: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBeginTime = this.handleBeginTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);

  }
  onChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        image: reader.result
      });
    }
    reader.readAsDataURL(file)
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

  handleDescription(description) {
    this.setState({ description: description });
  }
  async fileUpload(id, token) {
    toast("upload")
    const url = `/api/v1/event/upload/${id}`
    alert(url);
    alert(this.state.file);
    let data = await new FormData();
    data.append('event', this.state.file, this.state.file.name);
    let config = {
      headers: {
        'authorization': token
      },
      params: {
        username: this.state.organizer
      }
    }
    axios.post(url, data, config)
      .then((result) => {
        console.log("res:");
        console.log(result);
      })
      .catch(function (error) {
        console.log("err");
        console.log(error);
      });
  }

  handleSubmit() {
    const data = this.state;
    const token = localStorage.getItem('token');
    const method = this.props.type == "create" ? "POST" : "PUT";
    let id = this.props.type == "create" ? "" : this.props.match.params.id;
    let that = this;

    if (this.props.type == "create") {
      fetch(`/api/v1/event/${id}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify({ data: data })
      })
        .then(function (response) {

          that.setState({ redirect: true });
          return response.json();
        })
        .then(ress => {
          toast("123");
          let id = ress.data;
          this.fileUpload(id, token);
          return ress;
        })
        .then(handleErrors)
        .catch(function (error) {
          // this.fileUpload();
          console.log(error);
        });
    }



    // fetch(`/api/v1/event/${id}`, {
    //   method: method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     authorization: token
    //   },
    //   body: JSON.stringify({ data: data })
    // })
    //   .then(function (response) {
    //     that.setState({ redirect: true });
    //     return response.json();
    //   })
    //   .then(handleErrors)
    //   .catch(function (error) {
    //     this.fileUpload();
    //     console.log(error);
    //   });
  }

  componentDidMount() {
    if (this.props.type == "create") {
      return;
    }
    else {
      let that = this;
      const id = this.props.match.params.id;

      fetch(`/api/v1/event/${id}`)
        .then(handleErrors)
        .then(function (response) {
          return response.json();
        })
        .then(function (responseJson) {
          return responseJson.data;
        })
        .then(function (info) {
          that.setState({
            title: info.title,
            location: info.location,
            description: info.description,
            beginTime: info.beginTime,
            endTime: info.endTime
          })
          // console.log(info);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Header />
        <div class="create_event_container1">
          <div class="create_event_title">
            <div class="create_event_title_container" >
              <TitleHolder title={this.props.type == "create" ? "ساخت رویداد" : "ویرایش رویداد"} image={pencilImage} />
            </div>
          </div>

          <div class="create_event_container2">
            <div class="change_image">
              <div class="create_event_input" >
                <p class="edit_header_font"> تصویر رویداد </p>
                <div class="change_image_2">
                  <div class="prof_pic">
                    <img src={this.state.image} alt={123} />
                  </div>
                  <label class="change_button" for="upload-photo" > تغییر تصویر </label>
                  <input type="file" id="upload-photo" onChange={this.onChange} />
                </div>
              </div>
            </div>
            <div class="create_event_rest_1">
              <div class="create_event_input" >
                <p> نام رویداد: </p>
                <input class="create_event_rest_input" name="title" type="text" onChange={this.handleChange} value={this.state.title}></input>
              </div>
              <div class="create_event_input" >
                <p> محل برگزاری: </p>
                <input class="create_event_rest_input" name="location" type="text" onChange={this.handleChange} value={this.state.location}></input>
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ شروع: </p>
                <DatePicker date={this.state.beginTime} handleTime={this.handleBeginTime} />
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ پایان: </p>
                <DatePicker date={this.state.endTime} handleTime={this.handleEndTime} />
              </div>
              <div class="create_event_input" >
                <p class="input_date"> توضیحات: </p>
                <div class="create_event_textarea">
                  <TextArea text={this.state.description} handleText={this.handleDescription} />
                </div>
              </div>
              <div class="create_event_submit_container">
                <input class="event_page_signup_button" type="submit" onClick={this.handleSubmit} value='ثبت' />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);