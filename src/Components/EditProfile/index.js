import React from 'react';
import './EditProfile.css';
import { Header } from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import prof_pic from '../../images/temp_image.png';
import 'font-awesome/css/font-awesome.min.css'
import TitleHolder from '../../Utils/TitleHolder';
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { handleErrors } from '../../Utils/handleErrors'
import Footer from '../../Utils/Footer';

function mapStateToProps(state) {
  return {
    user: state.user,
    authenticated: state.authenticated,
  }
}

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      image: prof_pic,
      visibility: "visible",
      new_password: "",
      new_password_repeat: "",
      firstName: "",
      lastName: "",
      email: "",
      sid: "",
      isEdited: false
    }
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.password_change = this.password_change.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      sid: this.props.user.sid
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    let data = this.state;
    let token = localStorage.getItem('token');
    let that = this;

    fetch('/api/v1/user', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ data: data })
    })
      .then(function (response) {
        return response;
      })
      .then(handleErrors)
      .then(function () {
        return fetch(`/api/v1/user/${that.props.user.username}`);
      }).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        that.props.dispatch({ type: 'SET_USER', user: responseJson.data });
      }).then(function () {
        toast('ویرایش پروفایل شما با موفقیت انجام شد')
      }).then(function () {
        that.setState({ isEdited: true })
      }).catch(function (error) {
        console.log(error);
      });

  }

  onChange(event) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ image: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  fileUpload(file) {
    // toast('upload');
    // const url = 'http://example.com/file-upload';
    // const formData = new FormData();
    // formData.append('file', file)
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    // return post(url, formData, config)
  }

  password_change(event) {
    this.handleChange(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let value2;
    if (name == "new_password")
      value2 = this.state.new_password_repeat
    else
      value2 = this.state.new_password
    if (value == value2)
      this.setState({
        visibility: "visible"
      })
    else {
      this.setState({
        visibility: "hidden"
      })
    }
  }

  render() {
    let check_passwords_equal_class = { visibility: this.state.visibility };
    return (
      <div>
        <Header />
        <div class="create_event_container1">
          <div class="create_event_title">
            <div class="create_event_title_container" >
              <TitleHolder title="ویرایش پروفایل" image={pencilImage} />
            </div>
          </div>
          <div class="create_event_container2">
            <div class="change_image">
              <div class="create_event_input" >
                <p class="edit_header_font"> تصویر کاربر </p>
                <div class="change_image_2">
                  <div class="prof_pic">
                    <img src={this.state.image} alt={123} />
                  </div>
                  <label class="change_button" for="upload-photo" > تغییر تصویر </label>
                  <input type="file" id="upload-photo" onChange={this.onChange} />

                </div>
              </div>
            </div>
            <div class="two_info">
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> نام : </p>
                  <input name="firstName" class="create_event_rest_input" value={this.state.firstName} type="text" onChange={this.handleChange} />
                </div>
              </div>
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> نام خانوادگی : </p>
                  <input name="lastName" class="create_event_rest_input" value={this.state.lastName} type="text" onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div class="two_info">
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> ایمیل : </p>
                  <input name="email" class="create_event_rest_input" value={this.state.email} type="text" onChange={this.handleChange} />
                </div>
              </div>
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> شماره دانشجویی : </p>
                  <input name="sid" class="create_event_rest_input" value={this.state.sid} type="text" onChange={this.handleChange} />
                </div>
              </div>
            </div>

            <div class="two_info">
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> رمزعبور جدید : </p>
                  <input class="create_event_rest_input" type="password" name="new_password" onChange={this.password_change} ></input>
                </div>
              </div>
              <div class="create_event_rest tekrar">
                <div class="create_event_input" >
                  <p> تکرار : </p>
                  <input class="create_event_rest_input" type="password" name="new_password_repeat" onChange={this.password_change} ></input>
                </div>
              </div>
              <div class="ok_sign">
                <i class="fa fa-check" style={check_passwords_equal_class}  ></i>
              </div>
              <div class="create_event_submit_container edit_profile_submit">
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

export default connect(mapStateToProps)(EditProfile);