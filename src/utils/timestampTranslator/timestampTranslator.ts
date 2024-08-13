import { Timestamp } from 'firebase/firestore';

const timestampTranslator = (firestoreTimestamp: Timestamp) => {
  const date = new Timestamp(
    firestoreTimestamp.seconds,
    firestoreTimestamp.nanoseconds
  ).toDate();

  const result = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);

  return String(result);
};

export default timestampTranslator;
