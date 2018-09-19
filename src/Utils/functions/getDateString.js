import numberConverter from '../BaseForm/numberConverter';

export default function getDateString (date) {
  let dateString =
    numberConverter.toPersian(String(date.getFullYear())) +
    '/' +
    numberConverter.toPersian(String(Number(date.getMonth()) + 1)) +
    '/' +
    numberConverter.toPersian(String(date.getDate()));
  return dateString;
}
