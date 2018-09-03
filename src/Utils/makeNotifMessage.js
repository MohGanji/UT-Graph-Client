
export default function makeMessage(notification) {
  switch (notification.type) {
    case ('REQUEST'):
      notification.message = notification.applicant + " درخواست عضویت در رویداد "
        + notification.event + " را دارد ";
      break;
  }
  return notification;
}