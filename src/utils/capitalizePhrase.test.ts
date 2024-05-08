import capitalizePhrase from './capitalizePhrase';

describe('capitalizePhrase', () => {
  it('should capitalize the first letter of each word in a phrase', () => {
    const phrase = 'hello world';
    const expected = 'Hello World';
    const result = capitalizePhrase(phrase);
    expect(result).toBe(expected);
  });

  it('should handle empty string', () => {
    const phrase = '';
    const expected = '';
    const result = capitalizePhrase(phrase);
    expect(result).toBe(expected);
  });

  it('should handle single word', () => {
    const phrase = 'hello';
    const expected = 'Hello';
    const result = capitalizePhrase(phrase);
    expect(result).toBe(expected);
  });

  it('should handle phrase with leading/trailing spaces', () => {
    const phrase = '  hello world  ';
    const expected = '  Hello World  ';
    const result = capitalizePhrase(phrase);
    expect(result).toBe(expected);
  });

  it('should handle phrase with multiple spaces between words', () => {
    const phrase = 'hello   world';
    const expected = 'Hello   World';
    const result = capitalizePhrase(phrase);
    expect(result).toBe(expected);
  });
});
