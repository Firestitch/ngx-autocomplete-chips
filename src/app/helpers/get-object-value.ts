export function getObjectValue(attribute, mapping): any {
  if (!mapping) {
    return null;
  }
  return _getObjectValue(attribute, mapping.split('.'));
}

export function _getObjectValue(value, indexes): any {
  const index = indexes.shift(indexes);

  if (!index) {
    return value;
  }

  if (!value) {
    return value;
  }

  value = value[index];

  return _getObjectValue(value, indexes);
}
