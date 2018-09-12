import isPersianCharacter from './isPersianCharacter';

export default function isPersianString (str) {
  for (var i = 0; i < str.length; i++) {
    if (!isPersianCharacter(str[i])) {
      return false;
    }
  }
  return true;
}
