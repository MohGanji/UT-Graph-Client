export default function isEnglishCharacter (str) {
  return str.length === 1 && str.match(/[1-9A-Z-._]/i);
}
