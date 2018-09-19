import React from 'react';
import './style.css';
import handleErrors from '../../Utils/functions/handleErrors';
import Header from '../../Utils/Header';
import pencilImage from '../../images/tag.svg';
import beginTimeImage from '../../images/hourglass1.svg';
import capacityImage from '../../images/group1.svg';
import endTimeImage from '../../images/hourglass2.svg';
import mapImage from '../../images/map1.svg';
import TitleHolder from '../../Utils/TitleHolder';
import GoogleMapImage from '../../images/eventPageMap.png';
import StaffBox from './StaffBox/';
import ReactHtmlParser from 'react-html-parser';
import NotFound from '../NotFound';
import Footer from '../../Utils/Footer';
import PropTypes from 'prop-types';
import ProgressBar from 'react-progress-bar-plus';
import defaultEventImage from '../../images/defaultEvent.svg';
import defaultProfileImage from '../../images/defaultProfile.svg';
import { Link } from 'react-router-dom';
import numberConverter from '../../Utils/BaseForm/numberConverter';
import getDateString from '../../Utils/functions/getDateString';
import SignupPopup from './SignupPopup';
import RequestPopup from './RequestPopup';
import 'font-awesome/css/font-awesome.min.css';

export default class Event extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      info: { event: {}, organizer: {}, participantsCount: 0, staff: [] },
      notFound: false,
      loading: true
    };
  }

  async componentDidMount () {
    let that = this;
    const id = this.props.match.params.id;

    await fetch(`/api/v1/event/${id}`)
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
        console.log(info);
        info.participantsCount = numberConverter.toPersian(
          `${info.participantsCount}`
        );
        that.setState({ info: info });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ loading: false });
  }

  render () {
    if (this.state.notFound) {
      return <NotFound />;
    }
    let beginTimeString = getDateString(
      new Date(this.state.info.event.beginTime)
    );
    let endTimeString = getDateString(new Date(this.state.info.event.endTime));

    let staff = this.state.info.staff.map((user, i) => (
      <StaffBox key={i} user={user} />
    ));
    return (
      <div className="container">
        <ProgressBar
          percent={this.state.loading ? 0 : 100}
          spinner={false}
          autoIncrement={true}
        />
        <Header />
        <div className="event_page_info_1">
          <div className="event_page_photo_container">
            {this.state.info.event.image ===
            'http://localhost:8080/public/defaultEvent.svg' ? (
                <img src={defaultEventImage} alt="عکس رویداد" />
              ) : (
                <img src={this.state.info.event.image} alt="عکس رویداد" />
              )}
          </div>
          <div className="event_page_info_container">
            <div className="event_page_info_container_up">
              <TitleHolder
                image={pencilImage}
                title={this.state.info.event.title}
                customHeight="45px"
                customWidth="90%"
              />
            </div>
            <div className="event_page_info_container_bottom">
              <TitleHolder
                image={beginTimeImage}
                title={beginTimeString}
                customHeight="45px"
                customWidth="90%"
              />
              <TitleHolder
                image={endTimeImage}
                title={endTimeString}
                customHeight="45px"
                customWidth="90%"
              />
              <TitleHolder
                image={mapImage}
                title={this.state.info.event.location}
                customHeight="45px"
                customWidth="90%"
              />
              <TitleHolder
                image={capacityImage}
                title={
                  'تعداد شرکت کنندگان: ' +
                  this.state.info.participantsCount +
                  ' نفر'
                }
                customHeight="45px"
                customWidth="90%"
              />
            </div>
          </div>
        </div>

        <div className="event_page_info_2">
          <div className="event_page_about_left">
            <div className="event_page_about_left_description">
              <p className="info_showing">توضیحات:</p>
              <div className="event_page_about_left_description_text">
                {ReactHtmlParser(this.state.info.event.description)}
              </div>
            </div>
            {this.state.info.event.isPassed ? (
              <div className="event_page_button_container">
                <span>
                  <i className="fa fa-exclamation-circle" />
                  {' مهلت ثبت نام در این رویداد به اتمام رسیده است. '}
                </span>
              </div>
            ) : (
              <div className="event_page_button_container">
                <SignupPopup event={this.state.info.event} />
                <RequestPopup event={this.state.info.event} />
              </div>
            )}
          </div>
          <div className="event_page_about_right">
            <div className="event_page_about_right_up">
              <div className="event_page_about_right_up_map">
                <img src={GoogleMapImage} alt="نقشه" />
              </div>
              <div className="event_page_about_right_up_title_container">
                <p className="event_page_about_right_up_title">
                  {this.state.info.event.location}
                </p>
                <p className="event_page_about_right_up_location">
                  {' '}
                  <b>تهران</b> ایران
                </p>
              </div>
            </div>
            <div className="event_page_about_right_bottom">
              <div className="event_page_about_right_bottom_title">
                <p> حامیان </p>
              </div>
              {/* <div className="event_page_about_right_bottom_description" /> */}
            </div>
          </div>
        </div>

        <div className="event_page_info_3">
          <div className="event_page_users_left">
            <Link to={`/user/${this.state.info.organizer.username}`}>
              <div className="event_page_users_left_organizer">
                <div className="event_page_users_left_organizer_image">
                  {this.state.info.organizer.image ===
                  'http://localhost:8080/public/defaultProfile.svg' ? (
                      <img src={defaultProfileImage} alt="عکس کاربر" />
                    ) : (
                      <img
                        src={this.state.info.organizer.image}
                        alt="عکس کاربر"
                      />
                    )}
                </div>
                <div className="event_page_users_left_organizer_info">
                  <p className="event_page_users_left_organizer_info_title">
                    مسئول برگزاری
                  </p>
                  <span className="event_page_users_left_organizer_info_name">
                    {' '}
                    {this.state.info.organizer.firstName +
                      ' ' +
                      this.state.info.organizer.lastName}{' '}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="event_page_users_staff_container_full">
            <p className="info_showing">همکاران:</p>
            <div className="event_page_users_staff_container">{staff}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
