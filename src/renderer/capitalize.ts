export const capitalize = (sentence: string) => {
  const se = sentence.split('_');
  let s = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const word of se) {
    // eslint-disable-next-line prefer-template
    s = s + word[0].toUpperCase() + word.toLowerCase().slice(1) + ' ';
  }
  return s;
};

export default capitalize;
