export default function capitalizePhrase(phrase: string) {
  return phrase
    .split(' ')
    .map((word) => {
      const newWord = word.split('');
      const capitalLetter = newWord.shift() || '';
      return capitalLetter.toUpperCase() + newWord.join('');
    })
    .join(' ');
}
