export const generateBarcode = () => {
  const prefix = '2011';
  const randomPart = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0');
  return prefix + randomPart;
};
