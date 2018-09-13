import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import TitleHolder from '../../Utils/TitleHolder';
import DatePicker from '../../Utils/DatePicker';
import handleErrors from '../../Utils/functions/handleErrors';
import { connect } from 'react-redux';
import TextArea from '../../Utils/TextArea';
import Footer from '../../Utils/Footer';
import { Redirect } from 'react-router-dom';
import profilePicture from '../../images/background.jpg';
import { toast } from 'react-toastify';
import BaseForm from '../../Utils/BaseForm';
import axios from 'axios';

function mapStateToProps (state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
}

class CreateEvent extends BaseForm {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      beginTime: '',
      endTime: '',
      description: '',
      organizer: this.props.user.username,
      redirect: false,
      image: profilePicture,
      file: null
    };
    this.handleBeginTime = this.handleBeginTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onChange (event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleBeginTime (day, month, year) {
    let formattedDay = day < 10 ? (day = '0' + day) : day;
    let formattedMonth = month < 10 ? (month = '0' + month) : month;
    let beginTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ beginTime: beginTime });
  }

  handleEndTime (day, month, year) {
    let formattedDay = day < 10 ? (day = '0' + day) : day;
    let formattedMonth = month < 10 ? (month = '0' + month) : month;
    let endTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ endTime: endTime });
  }

  handleDescription (description) {
    this.setState({ description: description });
  }
  async fileUpload (id, token) {
    toast('upload');
    const url = '/api/v1/event/upload/' + id;
    // alert(url)
    // toast(url)
    // toast(id)
    // alert(this.state.file)
    let data = await new FormData();
    data.append('event', this.state.file, this.state.file.name);
    let config = {
      headers: {
        authorization: token
      },
      params: {
        username: this.state.organizer
      }
    };
    axios
      .post(url, data, config)
      .then(result => {
        // console.log("res:");
        // console.log(result);
      })
      .catch(function (error) {
        // console.log("err");
        console.log(error);
      });
  }

  handleSubmit () {
    if (this.props.type === 'create' && this.state.file == null) {
      toast('aks nadare');
      return;
    }
    let that = this;
    let data = {
      title: that.state.title,
      location: that.state.location,
      beginTime: that.state.beginTime,
      endTime: that.state.endTime,
      description: that.state.description,
      organizer: that.state.organizer
    };
    const token = localStorage.getItem('token');
    const method = this.props.type === 'create' ? 'POST' : 'PUT';
    let id = this.props.type === 'create' ? '' : this.props.match.params.id;
    // alert(id)
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
        if (that.props.type === 'create') return response.json();
        else return response;
      })
      .then(ress => {
        toast('123');
        if (that.props.type === 'create') id = ress.data;
        if (this.state.file != null) this.fileUpload(id, token);
        // else alert('nullfile')
        return ress;
      })
      .then(handleErrors)
      .catch(function (error) {
        // alert('err')
        // this.fileUpload();
        console.log('11111111');
        console.log(error);
      });
  }

  componentDidMount () {
    if (this.props.type === 'create') {
    } else {
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
          });
          // console.log(info);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        <div className="create_event_container1">
          <div className="create_event_title">
            <div className="create_event_title_container">
              <TitleHolder
                title={
                  this.props.type === 'create' ? 'ساخت رویداد' : 'ویرایش رویداد'
                }
                image={pencilImage}
              />
            </div>
          </div>

          <div className="create_event_container2">
            <div className="change_image">
              <div className="create_event_input">
                <p className="edit_header_font"> تصویر رویداد </p>
                <div className="change_image_2">
                  <div className="prof_pic">
                    <img src={this.state.image} alt="پروفایل" />
                  </div>
                  <label className="change_button" htmlFor="upload-photo">
                    {' '}
                    تغییر تصویر{' '}
                  </label>
                  <input
                    type="file"
                    id="upload-photo"
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> نام رویداد: </p>
                  <input
                    className="create_event_rest_input"
                    name="title"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                </div>
              </div>
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> محل برگزاری: </p>
                  <input
                    className="create_event_rest_input"
                    name="location"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.location}
                  />
                </div>
              </div>
            </div>
            <div className="create_event_rest_1">
              <div className="one_info">
                <div className="create_event_input">
                  <p className="input_date"> تاریخ شروع: </p>
                  <DatePicker
                    date={this.state.beginTime}
                    handleTime={this.handleBeginTime}
                  />
                </div>
              </div>
              <div className="one_info">
                <div className="create_event_input">
                  <p className="input_date"> تاریخ پایان: </p>
                  <DatePicker
                    date={this.state.endTime}
                    handleTime={this.handleEndTime}
                  />
                </div>
              </div>
              <div className="one_info">
                <div className="create_event_input">
                  <p className="input_date"> توضیحات: </p>
                  <div className="create_event_textarea">
                    <TextArea
                      text={this.state.description}
                      handleText={this.handleDescription}
                    />
                  </div>
                </div>
              </div>
              <div className="create_event_submit_container">
                <input
                  className="event_page_signup_button"
                  type="submit"
                  onClick={this.handleSubmit}
                  value="ثبت"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);
