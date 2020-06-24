const { isObject } = require('./is-object');

exports.isEmptyObject = (object) => {
  return isObject(object) && Object.keys(object).length === 0;
}