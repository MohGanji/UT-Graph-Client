
export default function makeMessage(notification) {
  switch (notification.type) {
    case ('REQUEST'):
      notification.message = notification.applicant + " has requested for " + notification.event;
      break;
  }
  return notification;
}