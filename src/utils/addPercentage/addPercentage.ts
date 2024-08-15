function calculateNumberWithPercentage(
  number: number,
  percent: number,
  type: 'incr' | 'decr'
) {
  console.log({ number, percent, type });

  return type === 'incr'
    ? Number(number) + Number(number) * (Number(percent) / 100)
    : Number(number) - Number(number) * (Number(percent) / 100);
}
export default calculateNumberWithPercentage;
