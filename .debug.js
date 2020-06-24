const { ErrorResponseModel, SuccessResponseModel } = require('./index').models;

const error = new ErrorResponseModel('input', 'error');
const s = new SuccessResponseModel({ item: 'item' })
console.log(error, '\n', s)
