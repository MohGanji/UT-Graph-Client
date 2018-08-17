import React from 'react';
import './UserEventBox.css';
import { handleErrors } from '../../Utils/handleErrors';
import BackgroundImage from '../../images/userEvent.jpg'
import MapImage from '../../images/map.svg'
import CalenderImage from '../../images/calender.svg'
import RoleImage from '../../images/role.svg';
import TitleHolder from '../../Utils/TitleHolder';

export class UserEventBox extends React.Component {
  render() {
    return (
      <div class="user_event_container">
        <div class="user_event_title">
          <a href="#"><p>همایشی که حجت برگزار کرد</p></a>
        </div>

        <div class="user_event_rest">
          <div class="user_event_poster">
            <img class="cover" src={BackgroundImage} />
          </div>
          <div class="user_event_info">
            <TitleHolder image={RoleImage} title="محمد هادی حجت" />
            <TitleHolder image={MapImage} title="دانشگاه تهران" />
            <TitleHolder image={CalenderImage} title="مرداد ۱۳۹۷" />
          </div>
        </div>

      </div>
    );
  }
}