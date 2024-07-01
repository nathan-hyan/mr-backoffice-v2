interface Props {
  internalId: string | number;
}

function getLatestInternalId<T>(collectionWithInternalId: (Props & T)[]) {
  if (collectionWithInternalId.length === 0) {
    return 0;
  }

  const sortedList = collectionWithInternalId.sort((first, second) => {
    if (first.internalId < second.internalId) {
      return 1;
    }

    if (first.internalId > second.internalId) {
      return -1;
    }

    return 0;
  })[0];

  return Number.isNaN(sortedList.internalId) ||
    !Number.isInteger(sortedList.internalId)
    ? 0
    : Number(sortedList.internalId);
}

export default getLatestInternalId;
