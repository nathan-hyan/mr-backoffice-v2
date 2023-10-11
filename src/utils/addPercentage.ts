function calculateNumberWithPercentage(
    number: number,
    percent: number,
    type: 'incr' | 'decr'
) {
    return type === 'incr'
        ? number + number * (percent / 100)
        : number - number * (percent / 100);
}
export default calculateNumberWithPercentage;
