import isEnglishCharacter from './isEnglishCharacter';

export default function isPersianString (str) {
  for (var i = 0; i < str.length; i++) {
    if (!isEnglishCharacter(str[i])) {
      return false;
    }
  }
  return true;
}
