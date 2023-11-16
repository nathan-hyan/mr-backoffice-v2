import getInitials, { stringAvatar, stringToColor } from './getInitials';

const defaultAvatar = {
  sx: { bgcolor: '#333' },
  children: 'S',
};

describe('stringToColor', () => {
  it('returns default color (#333) for empty string', () => {
    expect(stringToColor('')).toBe('#333');
  });

  it('returns default color (#333) for null or undefined input', () => {
    expect(stringToColor()).toBe('#333');
    expect(stringToColor(null)).toBe('#333');
  });

  it('returns a color string for a non-empty string input', () => {
    const color = stringToColor('example');
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('getInitials', () => {
  it('returns letter S if nothing is passed', () => {
    expect(getInitials()).toBe('S');
    expect(getInitials('')).toBe('S');
    expect(getInitials(null)).toBe('S');
  });

  it('returns the correct initials', () => {
    expect(getInitials('Hello World')).toBe('HW');
  });
});

describe('stringAvatar', () => {
  it('returns default avatar when no / invalid / empty prop is passed', () => {
    expect(stringAvatar()).toMatchObject(defaultAvatar);
    expect(stringAvatar('')).toMatchObject(defaultAvatar);
    expect(stringAvatar(null)).toMatchObject(defaultAvatar);
  });

  it('returns correct avatar when name is passed', () => {
    expect(stringAvatar('Hello World')).toMatchObject({
      sx: { bgcolor: '#849a96' },
      children: 'HW',
    });
  });
});
