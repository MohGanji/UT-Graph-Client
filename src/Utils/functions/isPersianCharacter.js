const persianAlphabet = [
  'آ',
  'ب',
  '‍‍پ',
  'ت',
  'ث',
  'ج',
  'چ',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'ژ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'ل',
  'م',
  'ن',
  'و',
  'ه',
  'ی',
  'ء',
  ' ',
  'ا'
];

export default function isPersianCharacter (char) {
  return persianAlphabet.find(element => {
    return element === char;
  });
}
