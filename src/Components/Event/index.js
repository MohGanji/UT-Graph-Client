import React from 'react';
import './Event.css';
import Popup from 'reactjs-popup'
import { toast } from 'react-toastify';

import { handleErrors } from '../../Utils/handleErrors';
import { Header } from '../../Utils/Header';
import BackgroundImage from '../../images/userEvent.jpg';
import pencilImage from '../../images/pencil.svg';
import beginTimeImage from '../../images/beginTime.svg';
import endTimeImage from '../../images/endTime2.svg';
import mapImage from '../../images/eventMap.svg';
import capacityImage from '../../images/capacity.svg';
import TitleHolder from '../../Utils/TitleHolder';
import OrganizerImage from '../../images/eventPageOrganizer.jpg';
import GoogleMapImage from '../../images/eventPageMap.png';
import StaffBox from './StaffBox';
import staffAvatar from '../../images/staffAvatar.png';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import NotFound from '../NotFound';
import Footer from '../../Utils/Footer';

const contentStyle = {
  height: 'innerHeight',
  width: 'innerWidth',
  'z-index': '1',
  padding: '0px',
}


const inner_div = {
  background: '#000000cc',
  'z-index': '0',
}

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      notFound: false
    }
    this.getDateString = this.getDateString.bind(this);
    this.register = this.register.bind(this);
    this.request_staff = this.request_staff.bind(this);
  }

  componentWillMount() {
    let that = this;
    const id = this.props.match.params.id;

    fetch(`/api/v1/event/${id}`)
      .then(handleErrors)
      .then(function (response) {
        if (!response.ok) {
          that.setState({ notFound: true });
        }
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (info) {
        that.setState({ info: info })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDateString(date) {
    let dateString = date.getFullYear() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getDate();
    return dateString;
  }

  register(close) {
    const id = this.props.match.params.id;
    const token = localStorage.getItem('token');

    fetch(`/api/v1/event/${id}/signup_attendent`, {
      headers: {
        authorization: token
      },
      method: "POST",
    })

    toast("ثبت نام شما در رویداد با موفقیت انجام شد");
  }

  request_staff() {
    const id = this.props.match.params.id;
    const token = localStorage.getItem('token');

    fetch(`/api/v1/event/${id}/signup_staff`, {
      headers: {
        authorization: token
      },
      method: "POST",
    })

    toast("درخواست شما برای ادمین رویداد ارسال شد");
  }

  render() {
    if (this.state.notFound) {
      return <NotFound />
    }

    let beginTimeString = this.getDateString(new Date(this.state.info.beginTime));
    let endTimeString = this.getDateString(new Date(this.state.info.endTime));

    return (
      <div>

        <Header />
        <div class="event_page_info_1">
          <div class="event_page_photo_container">
            <img src={this.state.info.poster_path == null ? BackgroundImage : this.state.info.poster_path} />
          </div>
          <div class="event_page_info_container">
            <div class="event_page_info_container_up">
              <TitleHolder image={pencilImage} title={this.state.info.title} />
            </div>
            <div class="event_page_info_container_bottom">
              <TitleHolder image={beginTimeImage} title={beginTimeString} />
              <TitleHolder image={endTimeImage} title={endTimeString} />
              <TitleHolder image={mapImage} title={this.state.info.location} />
              {/* <TitleHolder image={capacityImage} title="۶۰" /> */}
            </div>
          </div>
        </div>

        <div class="event_page_info_2">
          <div class="event_page_about_left">
            <div class="event_page_about_left_description" >
              <p class="info_showing">توضیحات:</p>
              <div class="event_page_about_left_description_text" >
                <p>{ReactHtmlParser(this.state.info.description)}</p>
              </div>
            </div>
            <div class="event_page_button_container">
              {/* <button onClick={this.register} class="event_page_signup_button"> اضافه شدن به عنوان شرکت کننده </button> */}
              <Popup
                trigger={
                  <button class="event_page_signup_button"> اضافه شدن به عنوان شرکت کننده </button>
                }
                modal
                contentStyle={contentStyle}
                overlayStyle={inner_div}
              >
                {close => (
                  <form class="modal">
                    {/* <span class="modal_close" onClick={close}>
                      &times;
                    </span> */}
                    <div class="modal_message">
                      آیا تمایل دارید به عنوان <b> شرکت کننده </b> در رویداد "
                      <b> {this.state.info.title} </b>
                      " شرکت کنید؟
                    </div>
                    <div class="accept_request">
                      <button onClick={() => { this.register(); close(); }} onSubmit={close}> <b> تایید </b> </button>
                    </div>
                  </form>
                )}
              </Popup>
              {/* <button onClick="return reAssign({this.request_staff},close)" class="event_page_signup_button"> اضافه شدن به عنوان کمک کننده </button> */}
              <Popup
                trigger={
                  <button class="event_page_signup_button"> اضافه شدن به عنوان کمک کننده </button>
                }
                modal
                contentStyle={contentStyle}
                overlayStyle={inner_div}
              >
                {close => (
                  <div class="modal">
                    {/* <span class="modal_close" onClick={close}>
                      &times;
                    </span> */}
                    <div class="modal_message">
                      آیا تمایل دارید به عنوان <b> کمک کننده (staff) </b> در رویداد "
                      <b> {this.state.info.title} </b>
                      " مشارکت کنید؟
                    </div>
                    <div class="accept_request">
                      <button onClick={() => { this.request_staff(); close(); }}> <b> تایید </b> </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
          <div class="event_page_about_right">
            <div class="event_page_about_right_up">
              <div class="event_page_about_right_up_map">
                <img src={GoogleMapImage} />
              </div>
              <div class="event_page_about_right_up_title_container">
                <p class="event_page_about_right_up_title">{this.state.info.location}</p>
                {/* city country ?? */}
                <p class="event_page_about_right_up_location"> <b>تهران</b> ایران</p>
              </div>
            </div>
            <div class="event_page_about_right_bottom" >
              <div class="event_page_about_right_bottom_title">
                <p> حامیان </p>
              </div>
              <div class="event_page_about_right_bottom_description">
              </div>
            </div>
          </div>
        </div>

        <div class="event_page_info_3">
          <div class="event_page_users_left">
            <div class="event_page_users_left_organizer">
              <div class="event_page_users_left_organizer_image">
                <img src={OrganizerImage} />
              </div>
              <div class="event_page_users_left_organizer_info">
                <p class="event_page_users_left_organizer_info_title">  مسئول برگزاری </p>
                <p class="event_page_users_left_organizer_info_name"> {this.state.info.organizer} </p>
              </div>
            </div>
          </div>
          <div class="event_page_users_staff_container">
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
            <StaffBox image={staffAvatar} role="عکاس" name="آواتار آواتاریان" />
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}
