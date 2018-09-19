import React from 'react';
import { Link } from 'react-router-dom';

export default function makeNotifMessage (notification) {
  switch (notification.type) {
    case 'REQUEST':
      notification.message = (
        <p className="notification_message">
          <b> {notification.applicant} </b> درخواست همکاری در رویداد
          <Link to={`/event/${notification.event._id}`}>
            <b> {notification.event.title} </b>
          </Link>
          را دارد
        </p>
      );
      break;
    case 'ACCEPT':
      notification.message = (
        <p className="notification_message">
          شما به عنوان کمک کننده به رویداد
          <Link to={`/event/${notification.event._id}`}>
            <b> {notification.event.title} </b>
          </Link>
          اضافه شده اید
        </p>
      );
      break;
    case 'REJECT':
      notification.message = (
        <p className="notification_message">
          متاسفانه درخواست شما برای کمک به رویداد
          <Link to={`/event/${notification.event._id}`}>
            <b> {notification.event.title} </b>
          </Link>
          از طرف برگزار کننده رویداد
          <b> رد شده است </b>
        </p>
      );
      break;
    case 'INFORMATION':
      notification.message = (
        <p className="notification_message">
          کمتر از یک روز تا رویداد
          <Link to={`/event/${notification.event._id}`}>
            <b> {notification.event.title} </b>
          </Link>
          مانده است
        </p>
      );
      break;
    default:
      notification.message = <p>نوع اطلاعیه مشخص نشده</p>;
      break;
  }
  return notification;
}
