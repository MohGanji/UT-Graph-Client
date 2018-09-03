export default function getDateString(date) {
  let dateString = date.getFullYear() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getDate();
  return dateString;
}