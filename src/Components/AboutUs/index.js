import React from 'react';
import Header from '../../Utils/Header';
import Footer from '../../Utils/Footer';
import utg from '../../images/utg.svg';
import email from '../../images/email.svg';
import './style.css';
import Developer from './Developer';
import TextArea from '../../Utils/TextArea';

const developers = [
	{ name: 'محمد مهدی جاهد خانیکی', username: 'mahdi.jahed', email: 'mahdi.jax@gmail.com', description: 'سلام بچه ها' },
	{ name: 'هادی حجت', username: 'hadi.hojjat', email: 'm.hadi.hojjat@gmail.com', description: 'سلام بچه ها' }
];
export default class AboutUs extends React.Component {
	render() {
		return (
			<div className="aa">
				<Header />
				<div className="about_team">
					<div className="about_team_image"><img id="utg-logo" src={utg} /></div>
					<div className="about_team_text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
				</div>
				<div className="team_developer">
					<Developer details={developers[0]} />
					<Developer details={developers[0]} />
					<Developer details={developers[0]} />
					<Developer details={developers[1]} />
					<Developer details={developers[1]} />
					<Developer details={developers[1]} />
				</div>
				<div className="contact_us">
					<div className="about_team_image"><img id="email-logo" src={email} /></div>
					<div className="inputs">
						<form >
							<label className="fname"> نام و نام خانوادگی </label>
							<input type="text" id="input_frame" name="firstname" maxlength="30" />

							<label className="email" > آدرس ایمیل </label>
							<input type="text" id="input_frame" name="firstname" maxlength="35" />

							<label className="phonenumber"> شماره تماس </label>
							<input type="tel" id="input_frame" name="firstname" maxlength="11" />

							<label className="message_input">متن پیام </label>
							{/*<input type="text" id="message_input_text" name="firstname" maxlength="250" /> */}
							{/* ba texxt area taviz behse aakharish */}
							<TextArea />
							<input id="submit_button" type="submit" value="ثبت" />
						</form>
					</div>
				</div>
				<Footer />
			</div>
		);


	}
}
