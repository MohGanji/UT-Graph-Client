import React from 'react';
import './Event.css';
import { handleErrors } from '../../Utils/handleErrors';
import { Header } from '../../Utils/Header'
import EventImage from '../../images/background.jpg'


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

        <div class="event_page">
          <div class="event_header">
            <div class="event_img">
              <img src={EventImage} class="img_fill_div" />
            </div>
            <div class="grid_white_space">
            </div>
            <div class="event_short_info">
              <p>
                رویداد بزرگ ای سی ام
            </p>
              <p>
                این رویداد مخصوص کسانی است که مورد تایید حجت باشند
            </p>
              <p> یه سری چیزای دیگه... </p>
            </div>
          </div>
          <div class="event_long_info">
            ما باید یاد بگیریم به دشمن هایمان هم فحش ندهیم چه برسد به اینکه در ورزش برابر تیم رقیب مان این اتفاق بیفتد. ما که ادعای فرهنگ و اخلاق داریم باید احترام به حریف را سرلوحه کارهایمان کنیم، حتی در حوزه های سیاسی و اجتماعی هم باید به رقیبمان احترام بگذاریم. امروز هم در استادیوم ها نباید به رقبا فحش بدهیم چرا که این صرفا یک رقابت ورزشی است و می توانیم در کمال احترام از تیم مان حمایت کنیم.
              فکر می کنید ریشه این رفتارهای عجیب در فوتبال ایران در چیست؟
              م خود حمایت کند که این موضوع هیچ توجیهی ندارد.   قطعا اگر بخواهد این روند ادامه داشته باشد ما بازیکنان و باشگاه ها تصمیم دیگری خواهیم گرفت چون این وضعیتی است که به این ورزش پرهواداران آسیب می زند.
              ولی خیلی ها می گویند مشکلات اقتصادی و معیشتی به این خشونت ها دامن می زند.
              ما باید یاد بگیریم از فضاهای شادمان استفاده بهینه کنیم و  می توانیم محیط استادیوم را به یک فضای شاد تبدیل کنیم که همه از آن لذت ببرند.  به هر دلیلی اینگونه رفتارها توجیه ندارد که بخواهیم در استادیوم ها که محیط فرهنگی است مشکلات مان را با ناهنجاری توجیه کنیم. من هم به عنوان یک بازیکن در زندگی ام هزار مشکل دارم و همه بازیکنان هم با همین مساله روبرو هستند ولی قرار نیست به استادیوم بیایم و بخواهیم با سنگ سر کسی را بشکنیم. سنگ پراکنی و بی احترامی هیچ توجیهی ندارد و این روش حمایت از یک تیم نیست.
            </div>
          <div class="register">
            <div class="register_check">
              <div class="event_register_button">
                <a href="#"> ثبت نام </a>
              </div>
              <div><input type="checkbox" /> با قوانین سایت موافقم </div>
            </div>
            <div></div>
            <div class="rules">
              سلام این صفحه ی قانوناس. باید زیاد حرف نزنید. اگه زیاد حرف بزنید، حجت عصبانی میشه.
                  اوکی؟ اعصابمو خورد نکنیدا. نباید وارد صفحه ی کس دیگه ای بشیدا.
                </div>
          </div>

          <div class="event_place">
            <div class="event_map">
              اینجا محل نقشه خواهد بود
            </div>
            <div class="event_address">
              <p> آدرس  : تهران</p>
              <p> شماره : ۰۹۰۳۳۰۸۸۶۰۰ </p>
              <p> moasd@ad.com : ایمیل</p>
              <p></p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
