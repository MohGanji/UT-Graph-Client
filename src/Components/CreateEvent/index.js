import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import pencilImage from '../../images/pencil1.svg';
import TitleHolder from '../../Utils/TitleHolder';
import DatePicker from '../../Utils/DatePicker';
import handleErrors from '../../Utils/functions/handleErrors';
import { connect } from 'react-redux';
import TextArea from '../../Utils/TextArea';
import Footer from '../../Utils/Footer';
import { Redirect } from 'react-router-dom';
import profilePicture from '../../images/defaultEvent.svg';
import BaseForm from '../../Utils/BaseForm';
import axios from 'axios';
import Select from 'react-select';
import ProgressBar from 'react-progress-bar-plus';

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
      file: null,
      loading: true
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
    const url = '/api/v1/event/upload/' + id;
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
      .then(result => {})
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit () {
    let that = this;
    let data = {
      title: that.state.title,
      location: that.state.location,
      beginTime: that.state.beginTime,
      endTime: that.state.endTime,
      description: that.state.description,
      organizer: that.state.organizer
    };
    const token = localStorage.getItem('accessToken');
    const method = this.props.type === 'create' ? 'POST' : 'PUT';
    let id = this.props.type === 'create' ? '' : this.props.match.params.id;
    let url = `/api/v1/event/${id}`;
    let dataSend = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ data: data })
    };
    // centralRequest(url, dataSend)
    fetch(url, dataSend)
      .then(function (response) {
        that.setState({ redirect: true });
        if (that.props.type === 'create') return response.json();
        else return response;
      })
      .then(ress => {
        if (that.props.type === 'create') id = ress.data;
        if (this.state.file != null) this.fileUpload(id, token);
        return ress;
      })
      .then(handleErrors)
      .catch(function (error) {
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
            endTime: info.endTime,
            image: info.image
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.setState({ loading: false });
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const staffOptions = [
      { value: 'hadi.hojjat', label: 'Hadi Hojjat' },
      { value: 'mahdi.jahed', label: 'Mahdi Jahed' },
      { value: 'mojtaba.shahbazi', label: 'Mojtaba Shahbazi' }
    ];
    return (
      <div>
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
                title={
                  this.props.type === 'create' ? 'ساخت رویداد' : 'ویرایش رویداد'
                }
                image={pencilImage}
                customHeight="42px"
              />
            </div>
          </div>

          <div className="create_event_container2">
            <div className="create_event_picture">
              <div className="create_event_tittle">
                <p className="create_event_header_font"> تصویر رویداد </p>
              </div>
              <div className="create_event_picture_content">
                <div className="prof_pic">
                  <img src={this.state.image} alt="پروفایل" />
                </div>
                <label className="change_button" htmlFor="upload-photo">
                  {' '}
                  تغییر تصویر{' '}
                </label>
                <input type="file" id="upload-photo" onChange={this.onChange} />
              </div>
            </div>
            <div className="create_event_details">
              <div className="create_event_tittle">
                <p className="create_event_header_font"> مشخصات رویداد </p>
              </div>
              <div className="create_event_details_content">
                <div className="create_event_details_row first_row">
                  <div className="create_event_input left_field">
                    <p className="create_event_subtittle_font"> نام رویداد: </p>
                    <input
                      className="create_event_rest_input"
                      name="title"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </div>
                  <div className="create_event_input right_field">
                    <p className="create_event_subtittle_font">
                      {' '}
                      محل برگزاری:{' '}
                    </p>
                    <input
                      className="create_event_rest_input"
                      name="location"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.location}
                    />
                  </div>
                </div>
                <div className="create_event_details_row second_row">
                  <div className="create_event_input">
                    <p className="create_event_subtittle_font"> تاریخ شروع: </p>
                    <DatePicker
                      date={this.state.beginTime}
                      handleTime={this.handleBeginTime}
                    />
                  </div>
                  <div className="create_event_input">
                    <p className="create_event_subtittle_font">
                      {' '}
                      تاریخ پایان:{' '}
                    </p>
                    <DatePicker
                      date={this.state.endTime}
                      handleTime={this.handleEndTime}
                    />
                  </div>
                </div>
                <div className="create_event_details_row third_row">
                  <div className="create_event_input">
                    <p className="create_event_subtittle_font"> توضیحات: </p>
                    <div className="create_event_textarea">
                      <TextArea
                        text={this.state.description}
                        handleText={this.handleDescription}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create_event_search">
              <div className="create_event_search_staff">
                <div className="create_event_tittle">
                  <p className="create_event_header_font"> اضافه کردن همکار </p>
                </div>
                <div className="create_event_search_content">
                  <Select
                    options={staffOptions}
                    isMulti={true}
                    placeholder={'جستجو...'}
                  />
                </div>
              </div>
              <div className="create_event_search_sponser">
                <div className="create_event_tittle">
                  <p className="create_event_header_font"> اضافه کردن حامی </p>
                </div>
                <div className="create_event_search_content">
                  <Select
                    options={staffOptions}
                    isMulti={true}
                    placeholder={'جستجو...'}
                  />
                </div>
              </div>
            </div>
            <div className="create_event_submit">
              <input
                className="event_page_signup_button"
                type="submit"
                onClick={this.handleSubmit}
                value="ثبت"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);
