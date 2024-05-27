export function upsert(array, targetObject, keyToMatch) {
  const index = array.findIndex(
    (item) => item[keyToMatch] === targetObject[keyToMatch]
  );

  if (index === -1) {
    // The object is not present in the array, so add it.
    array.push(targetObject);
  } else {
    // The object is present in the array, so update it.
    array[index] = { ...array[index], ...targetObject };
  }
}

export function isValidLocation(location) {
  return (
    !!location &&
    !!location.id &&
    !!location.name &&
    !!location.country &&
    !!location.lat &&
    !!location.lon
  );
}
