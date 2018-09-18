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
import BaseForm from '../../Utils/BaseForm';
import axios from 'axios';
import Select from 'react-select';
import ProgressBar from 'react-progress-bar-plus';
import defaultEventImage from '../../images/defaultEvent.svg';

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
}

class CreateEvent extends BaseForm {
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
      image: defaultEventImage,
      file: null,
      loading: true,
      sponsers: [],
      staffs: [],
      sponserSelected: [],
      staffSelected: []
    };
    this.handleBeginTime = this.handleBeginTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    };
    reader.readAsDataURL(file);
  }

  handleDescription(description) {
    this.setState({ description: description });
  }
  async fileUpload(id, token) {
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
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSubmit() {
    let that = this;
    let data = {
      title: that.state.title,
      location: that.state.location,
      beginTime: that.state.beginTime,
      endTime: that.state.endTime,
      description: that.state.description,
      organizer: that.state.organizer,
      sponsers: that.state.sponserSelected,
      staffs: that.state.staffSelected
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
      .then(function(response) {
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
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let that = this;
    if (this.props.type === 'create') {
    } else {
      const id = this.props.match.params.id;

      fetch(`/api/v1/event/${id}`)
        .then(function(response) {
          return response.json();
        })
        .then(handleErrors)
        .then(function(responseJson) {
          return responseJson.data;
        })
        .then(function(info) {
          that.setState({
            title: info.title,
            location: info.location,
            description: info.description,
            beginTime: info.beginTime,
            endTime: info.endTime,
            image: info.image
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    let token = localStorage.getItem('accessToken');
    fetch(`/api/v1/sponser/`, {
      method: 'GET',
      headers: {
        authorization: token
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function(responseJson) {
        return responseJson.data;
      })
      .then(function(info) {
        let names = info.map(sponser => {
          let obj = {
            value: sponser,
            label: sponser.name
          };
          return obj;
        });
        that.setState({ sponsers: names });
      })
      .catch(function(error) {
        console.log(error);
      });

    fetch(`/api/v1/user/`)
      .then(function(response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function(responseJson) {
        return responseJson.data;
      })
      .then(function(info) {
        let usernames = info.map(user => {
          let obj = {
            value: user,
            label: user.username
          };
          return obj;
        });
        that.setState({ staffs: usernames });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ loading: false });
  }

  handleBeginTime(day, month, year) {
    let formattedDay = day < 10 ? (day = '0' + day) : day;
    let formattedMonth = month < 10 ? (month = '0' + month) : month;
    let beginTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ beginTime: beginTime });
  }

  handleEndTime(day, month, year) {
    let formattedDay = day < 10 ? (day = '0' + day) : day;
    let formattedMonth = month < 10 ? (month = '0' + month) : month;
    let endTime = year + '-' + formattedMonth + '-' + formattedDay;

    this.setState({ endTime: endTime });
  }

  handleSelect = name => optionSelected => {
    const value = optionSelected.map(option => option.value);
    console.log(name, value);
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    // const staffOptions = [
    //   { value: 'hadi.hojjat', label: 'Hadi Hojjat' },
    //   { value: 'mahdi.jahed', label: 'Mahdi Jahed' },
    //   { value: 'mojtaba.shahbazi', label: 'Mojtaba Shahbazi' }
    // ];
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
                  {this.state.image ===
                  'http://localhost:8080/public/defaultEvent.svg' ? (
                    <img src={defaultEventImage} alt="عکس رویداد" />
                  ) : (
                    <img src={this.state.image} alt="عکس رویداد" />
                  )}
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
                    {/* <DatePicker
                      onChange={value => this.setState({ beginTime: value })}
                      value={this.state.beginTime}
                    /> */}
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
                    options={this.state.staffs}
                    isMulti={true}
                    placeholder={'جستجو...'}
                    name="staffs"
                    onChange={this.handleSelect('staffSelected')}
                  />
                </div>
              </div>
              <div className="create_event_search_sponser">
                <div className="create_event_tittle">
                  <p className="create_event_header_font"> اضافه کردن حامی </p>
                </div>
                <div className="create_event_search_content">
                  <Select
                    options={this.state.sponsers}
                    isMulti={true}
                    placeholder={'جستجو...'}
                    name="sponsers"
                    onChange={this.handleSelect('sponserSelected')}
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
