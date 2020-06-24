exports.isObject = (object) => {
  return object != null && typeof object == 'object' && object.length == undefined;
}