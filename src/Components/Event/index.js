import React from 'react';
import './Event.css';
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


export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {}
    }
  }

  componentDidMount() {
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
        that.setState({ info: info })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
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
              <TitleHolder image={beginTimeImage} title="۲۵ مرداد ۱۳۹۷" />
              <TitleHolder image={endTimeImage} title="۲۵ شهریور ۱۳۹۷" />
              <TitleHolder image={mapImage} title="دانشگاه تهران" />
              {/* <TitleHolder image={capacityImage} title="۶۰" /> */}
            </div>
          </div>
        </div>

        <div class="event_page_info_2">
          <div class="event_page_about_left">
            <button class="event_page_signup_button"> درخواست عضویت </button>
          </div>
          <div class="event_page_about_right">
            <div class="event_page_about_right_up">
              <div class="event_page_about_right_up_map">
                <img src={GoogleMapImage} />
              </div>
              <div class="event_page_about_right_up_title_container">
                <p class="event_page_about_right_up_title"> دانشگاه تهران </p>
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
                <p class="event_page_users_left_organizer_info_name"> آرمان رستمی </p>
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

      </div >
    );
  }
}
