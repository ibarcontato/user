const { ErrorResponseModel } = require('../models/error-response-model');

exports.throwErrorResponseModel = (inputData, errorMessage, statusCode = 400) => {
  throw JSON.stringify(new ErrorResponseModel(inputData, errorMessage, statusCode));
}  