import { UserRoles } from '~constants/firebase';

import roleTranslator from './roleTranslator';

describe.each([
  {
    value: UserRoles.Admin,
    expected: 'Administrador',
  },
  {
    value: UserRoles.Employee,
    expected: 'Emplead@',
  },
  {
    value: UserRoles.Customer,
    expected: 'Cliente',
  },
  {
    value: undefined,
    expected: 'Cliente',
  },
])('roleTranslator', ({ value, expected }) => {
  it(`returns appropiate string for prop ${value}`, () => {
    const result = roleTranslator(value);

    expect(result).toBe(expected);
  });
});
