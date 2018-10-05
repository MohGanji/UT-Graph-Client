import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import pencilImage from '../../images/pencil1.svg';
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
import TextArea from '../../Utils/TextArea';
import ProgressBar from 'react-progress-bar-plus';
import defaultProfileImage from '../../images/defaultProfile.svg';
import ReactLoading from 'react-loading';

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
      rightPassword: true,
      new_password: '',
      new_password_repeat: '',
      firstName: '',
      lastName: '',
      email: '',
      sid: '',
      p_sid: '',
      bio: '',
      isEditing: false,
      isUploading: false,
      isEdited: false,
      isUploaded: false,
      warnings: []
    };
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBio = this.handleBio.bind(this);
  }

  componentDidMount () {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      sid: this.props.user.sid,
      p_sid: numberConverter.toPersian(this.props.user.sid),
      image: this.props.user.image,
      bio: this.props.user.bio
    });
  }

  handleSubmit () {
    this.setState({ isEditing: true });

    if (!this.state.rightPassword) {
      return;
    }

    if (this.state.file != null) {
      this.fileUpload();
    }
    let that = this;
    let data = {
      password: that.state.new_password,
      firstName: that.state.firstName,
      lastName: that.state.lastName,
      email: that.state.email,
      sid: that.state.sid,
      bio: that.state.bio
    };
    let token = localStorage.getItem('accessToken');
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
        console.log(responseJson);
        that.props.dispatch({ type: 'SET_USER', user: responseJson.data.user });
      })
      .then(function () {
        that.setState({ isEditing: false, isEdited: true });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ loading: false });
  }

  handleBio (bio) {
    this.setState({ bio: bio });
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
    this.setState({ isUploading: true });

    let that = this;
    let token = localStorage.getItem('accessToken');
    const url = '/api/v1/user/upload';
    let data = await new FormData();
    data.append('file', this.state.file, this.state.file.name);
    let config = {
      method: 'post',
      headers: {
        authorization: token
      }
    };
    axios
      .post(url, data, config)
      .then(result => {
        console.log(result);
      })
      .then(() => {
        axios(`/api/v1/user/${this.props.user.username}`)
          .then(function (response) {
            return response.data.data;
          })
          .then(function (responseData) {
            that.props.dispatch({
              type: 'SET_USER',
              user: responseData.user
            });
          })
          .then(function () {
            that.setState({ isUploading: false, isUploaded: true });
          });
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
        rightPassword: true
      });
    } else {
      this.setState({
        rightPassword: false
      });
    }
  }

  render () {
    if (this.state.isEdited && this.state.isUploaded) {
      toast.success('ویرایش پروفایل شما با موفقیت انجام شد');
    }
    return (
      <div className="container">
        <ProgressBar
          percent={this.state.loading ? 0 : 100}
          spinner={false}
          autoIncrement={true}
        />
        <Header />
        <div className="create_event_container1">
          <div className="create_event_title">
            <div className="create_event_title_container">
              <TitleHolder
                title="ویرایش پروفایل"
                image={pencilImage}
                customHeight="42px"
              />
            </div>
          </div>
          <div className="create_event_container2">
            <div className="create_event_picture">
              <div className="create_event_input">
                <div className="create_event_tittle">
                  <p className="create_event_header_font"> تصویر کاربر </p>
                </div>
                <div className="create_event_picture_content">
                  <div className="prof_pic">
                    {this.state.image === '' ? (
                      <img src={defaultProfileImage} alt="عکس پروفایل" />
                    ) : (
                      <img src={this.state.image} alt="عکس پروفایل" />
                    )}
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
            <div className="create_event_tittle">
              <p className="create_event_header_font"> مشخصات کاربر </p>
            </div>
            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> نام : </p>
                  <input
                    name="firstName"
                    className={
                      this.state.warnings['firstName']
                        ? 'create_event_rest_input input_error'
                        : 'create_event_rest_input'
                    }
                    value={this.state.firstName}
                    type="text"
                    onChange={this.handleLanguageInput.bind(this, 'persian')}
                  />
                  <p
                    style={
                      this.state.warnings['firstName']
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                    className="input_info"
                  >
                    <i className="fa fa-info-circle" /> لطفا نام خود را به فارسی
                    وارد کنید
                  </p>
                </div>
              </div>
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> نام خانوادگی : </p>
                  <input
                    name="lastName"
                    className={
                      this.state.warnings['lastName']
                        ? 'create_event_rest_input input_error'
                        : 'create_event_rest_input'
                    }
                    value={this.state.lastName}
                    type="text"
                    onChange={this.handleLanguageInput.bind(this, 'persian')}
                  />
                  <p
                    style={
                      this.state.warnings['lastName']
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                    className="input_info"
                  >
                    <i className="fa fa-info-circle" /> لطفا نام خانوادگی خود را
                    به فارسی وارد کنید
                  </p>
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
                    className={
                      this.state.warnings['sid']
                        ? 'create_event_rest_input input_error'
                        : 'create_event_rest_input'
                    }
                    value={this.state.p_sid}
                    type="text"
                    onChange={this.handleNumberInput}
                  />
                </div>
                <p
                  style={
                    this.state.warnings['sid']
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" />
                  {' لطفا ورودی عددی وارد کنید '}
                </p>
              </div>
            </div>

            <div className="two_info">
              <div className="create_event_rest">
                <div className="create_event_input">
                  <p> رمزعبور جدید : </p>
                  <input
                    className={
                      this.state.rightPassword
                        ? 'create_event_rest_input'
                        : 'create_event_rest_input input_error'
                    }
                    type="password"
                    name="new_password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <p
                  style={
                    this.state.rightPassword
                      ? { display: 'none' }
                      : { display: 'block' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" />
                  {' رمز عبور و تکرار رمز عبور باید یکسان باشند '}
                </p>
              </div>
              <div className="create_event_rest tekrar">
                <div className="create_event_input">
                  <p> تکرار : </p>
                  <input
                    className={
                      this.state.rightPassword
                        ? 'create_event_rest_input'
                        : 'create_event_rest_input input_error'
                    }
                    type="password"
                    name="new_password_repeat"
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              {this.state.rightPassword ? (
                <div className="ok_sign">
                  <i className="fa fa-check" />
                </div>
              ) : (
                <div className="not_ok_sign">
                  <i className="fa fa-times" />
                </div>
              )}
              <div className="create_event_input about_center">
                <p className="input_date"> درباره من: </p>
                <div className="create_event_textarea">
                  <TextArea text={this.state.bio} handleText={this.handleBio} />
                </div>
              </div>
              <div
                className="uploading"
                style={
                  this.state.isEditing && this.state.isUploading
                    ? {}
                    : { display: 'none' }
                }
              >
                <ReactLoading
                  type="spinningBubbles"
                  color="#352649"
                  height={30}
                  width={30}
                />
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
