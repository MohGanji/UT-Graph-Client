import React from 'react';
import './UserEventBox.css';
import { handleErrors } from '../../Utils/handleErrors';
import BackgroundImage from '../../images/userEvent.jpg'
import MapImage from '../../images/map.svg'
import CalenderImage from '../../images/calender.svg'
import RoleImage from '../../images/role.svg';

export class UserEventBox extends React.Component {
  render() {
    return (
      <div class="user_event_container">
        <div class="user_event_title">
          <p>همایشی که حجت برگزار کرد</p>
        </div>z

        <div class="user_event_rest">
          <div class="user_event_poster">
            <img class="cover" src={BackgroundImage} />
          </div>
          <div class="user_event_info">

            <div class="user_event_info_container">
              <div class="user_event_info_container_image">
                <img src={RoleImage} />
              </div>
              <div class="user_event_info_container_name">
                <p>محمد هادی حجت</p>
              </div>
            </div>

            <div class="user_event_info_container">
              <div class="user_event_info_container_image">
                <img src={MapImage} />
              </div>
              <div class="user_event_info_container_name">
                <p>دانشگاه تهران</p>
              </div>
            </div>

            <div class="user_event_info_container">
              <div class="user_event_info_container_image">
                <img src={CalenderImage} />
              </div>
              <div class="user_event_info_container_name">
                <p>مرداد ۱۳۹۷</p>
              </div>
            </div>

            {/* <img src={MapImage} /> */}
            {/* <img src={CalenderImage} /> */}
          </div>
        </div>

      </div>
    );
  }
}