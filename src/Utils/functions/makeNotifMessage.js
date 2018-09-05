import React from 'react';

export default function makeMessage(notification) {
  switch (notification.type) {
    case ('REQUEST'):
      notification.message =
        <p>
          <b> {notification.applicant} </b> درخواست همکاری در رویداد
           <b> "{notification.event}" </b>
          را دارد
        </p>
      break;
    case ('ACCEPT'):
      notification.message =
        <p>
          شما به عنوان کمک کننده به رویداد
          <b> "{notification.event}" </b>
          اضافه شده اید
        </p>
      break;
    case ('REJECT'):
      notification.message =
        <p>
          متاسفانه درخواست شما برای کمک به رویداد
          <b> "{notification.event}" </b>
          از طرف برگزار کننده رویداد
          <b> رد شده است </b>
        </p>
      break;
    case ('INFORMATION'):
      notification.message =
        <p>
          کمتر از یک روز تا رویداد
          <b> "{notification.event}" </b>
          مانده است
        </p>
      break;
  }
  return notification;
}