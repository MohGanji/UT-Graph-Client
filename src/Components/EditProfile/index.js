import React from 'react';
import './EditProfile.css';
import { Header } from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import prof_pic from '../../images/temp_image.png';
import 'font-awesome/css/font-awesome.min.css'

import TitleHolder from '../../Utils/TitleHolder';
import { toast } from 'react-toastify';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      image: prof_pic,
      visibility: "visible",
      new_password: "",
      new_password_repeat: ""
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.password_change = this.password_change.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // toast("change!");
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit(e) {
    // e.preventDefault() // Stop form submit
    // this.fileUpload(this.state.file).then((response) => {
    //   console.log(response.data);
    // })
    // toast('submit');
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
            <div class="change_image">z
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
                  <input class="create_event_rest_input" type="text" ></input>
                </div>
              </div>
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> نام خانوادگی : </p>
                  <input class="create_event_rest_input" type="text" ></input>
                </div>
              </div>
            </div>
            <div class="two_info">
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> ایمیل : </p>
                  <input class="create_event_rest_input" type="text" ></input>
                </div>
              </div>
              <div class="create_event_rest">
                <div class="create_event_input" >
                  <p> شماره دانشجویی : </p>
                  <input class="create_event_rest_input" type="text" ></input>
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
            </div>
          </div>
        </div>
      </div >
    );
  }
}
