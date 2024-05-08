/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timestamp } from 'firebase/firestore';

import { timestampTranslator } from './timestampTranslator';

describe('timestampTranslator', () => {
  it('returns the formatted timestamp in the correct format', () => {
    const firestoreTimestamp = new Timestamp(1634567890, 0);
    const expected = '18 oct 2021, 11:38';

    expect(timestampTranslator(firestoreTimestamp)).toBe(expected);
  });
});
