import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import profilePicture from '../../images/defaultProfile.jpg';
import 'font-awesome/css/font-awesome.min.css';
import TitleHolder from '../../Utils/TitleHolder';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import handleErrors from '../../Utils/functions/handleErrors';
import Footer from '../../Utils/Footer';
import axios from 'axios';
import BaseForm from '../../Utils/BaseForm';
import numberConverter from '../../Utils/BaseForm/numberConverter';

function mapStateToProps (state) {
  return {
    user: state.user,
    authenticated: state.authenticated
  };
}

class EditProfile extends BaseForm {
  constructor (props) {
    super(props);
    this.state = {
      file: null,
      image: profilePicture,
      visibility: 'visible',
      new_password: '',
      new_password_repeat: '',
      firstName: '',
      lastName: '',
      email: '',
      sid: '',
      p_sid: '',
      isEdited: false
    };
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      sid: this.props.user.sid,
      p_sid: numberConverter.toPersian(this.props.user.sid),
      image: this.props.user.image
    });
  }

  handleSubmit () {
    this.fileUpload();
    let that = this;
    let data = {
      password: that.state.new_password,
      firstName: that.state.firstName,
      lastName: that.state.lastName,
      email: that.state.email,
      sid: that.state.sid
    };
    let token = localStorage.getItem('token');
    let form = new FormData();
    form.append('file', this.state.file);
    fetch('/api/v1/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        data: data
      })
    })
      .then(function (response) {
        return response;
      })
      .then(handleErrors)
      .then(function () {
        return fetch(`/api/v1/user/${that.props.user.username}`);
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        that.props.dispatch({ type: 'SET_USER', user: responseJson.data });
      })
      .then(function () {
        toast.success('ویرایش پروفایل شما با موفقیت انجام شد');
      })
      .then(function () {
        that.setState({ isEdited: true });
      })
      .catch(function (error) {
        console.log(error);
      });
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
  async fileUpload () {
    let token = localStorage.getItem('token');
    const url = '/api/v1/user/upload';
    let data = await new FormData();
    data.append('file', this.state.file, this.state.file.name);
    let config = {
      method: 'post',
      headers: {
        authorization: token
      },
      params: {
        // "a": "b"
      }
    };
    axios
      .post(url, data, config)
      .then(result => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePasswordChange (event) {
    this.handleChange(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let value2;
    if (name === 'new_password') value2 = this.state.new_password_repeat;
    else value2 = this.state.new_password;
    if (value === value2) {
      this.setState({
        visibility: 'visible'
      });
    } else {
      this.setState({
        visibility: 'hidden'
      });
    }
  }

  render () {
    let checkPasswordEqualStyle = { visibility: this.state.visibility };
    return (
      <div>
        <Header />
        <div className="create_event_container1">
          <div className="create_event_title">
            <div className="create_event_title_container">
              <TitleHolder title="ویرایش پروفایل" image={pencilImage} />
            </div>
          </div>
          <div className="create_event_container2">
            <div className="change_image">
              <div className="create_event_input">
                <p className="edit_header_font"> تصویر کاربر </p>
                <div className="change_image_2">
                  <div className="prof_pic">
                    <img src={this.state.image} alt="عکس پروفایل" />
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
                  {/* <div onClick={this.fileUpload}> تغییر عکس </div> */}
                </div>
              </div>
            </div>
            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> نام : </p>
                  <input
                    name="firstName"
                    className="create_event_rest_input"
                    value={this.state.firstName}
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> نام خانوادگی : </p>
                  <input
                    name="lastName"
                    className="create_event_rest_input"
                    value={this.state.lastName}
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> ایمیل : </p>
                  <input
                    name="email"
                    className="create_event_rest_input"
                    value={this.state.email}
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> شماره دانشجویی : </p>
                  <input
                    name="sid"
                    className="create_event_rest_input"
                    value={this.state.p_sid}
                    type="text"
                    onChange={this.handleNumberInput}
                  />
                </div>
              </div>
            </div>

            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> رمزعبور جدید : </p>
                  <input
                    className="create_event_rest_input"
                    type="password"
                    name="new_password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              <div className="create_event_rest tekrar">
                <div className="create_event_input">
                  <p> تکرار : </p>
                  <input
                    className="create_event_rest_input"
                    type="password"
                    name="new_password_repeat"
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              <div className="ok_sign">
                <i className="fa fa-check" style={checkPasswordEqualStyle} />
              </div>
              <div className="create_event_submit_container edit_profile_submit">
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

export default connect(mapStateToProps)(EditProfile);
