import React from 'react';
import './CreateEvent.css';
import { Header } from '../../Utils/Header';
import pencilImage from '../../images/pencil.svg';
import TitleHolder from '../../Utils/TitleHolder';

export default class CreateEvent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div class="create_event_container1">
          <div class="create_event_title">
            <TitleHolder title="ساخت رویداد" image={pencilImage} />
          </div>
          <div class="create_event_container2">
            <div class="create_event_rest">
              <div class="create_event_input" >
                <p> نام رویداد: </p>
                <input class="input_text" type="text" ></input>
              </div>
              <div class="create_event_input" >
                <p> محل برگزاری: </p>
                <input class="input_text" type="text"  ></input>
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ شروع: </p>
                <input type="date" ></input>
              </div>
              <div class="create_event_input" >
                <p class="input_date"> تاریخ پایان: </p>
                <input type="date" ></input>
              </div>
              <div class="create_event_input" >
                <p class="input_date"> توضیحات: </p>
                <textarea class="event_text_area">
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
