let persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
let english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default class NumberConverter {
  static toEnglish (str) {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      let char;
      for (let j = 0; j < 10; j++) {
        if (str[i] === english[j] || str[i] === persian[j]) char = english[j];
      }
      if (!char) return '';
      res += char;
    }
    return res;
  }

  static toPersian (str) {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      let char;
      for (let j = 0; j < 10; j++) {
        if (str[i] === english[j] || str[i] === persian[j]) char = persian[j];
      }
      console.log(char);
      if (!char) return '';
      res += char;
    }
    return res;
  }
}
