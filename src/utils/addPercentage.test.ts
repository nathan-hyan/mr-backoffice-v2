import calculateNumberWithPercentage from './addPercentage';

describe('Calculate Number With Percentage', () => {
  it('works when increasing numbers', () => {
    const result = calculateNumberWithPercentage(10, 10, 'incr');

    expect(result).toBe(11);
  });

  it('works when decreasing numbers', () => {
    const result = calculateNumberWithPercentage(10, 10, 'decr');

    expect(result).toBe(9);
  });
});
