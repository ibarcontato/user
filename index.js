exports.models = {
  SuccessResponseModel: require('./models/success-response-model'),
  ErrorResponseModel: require('./models/error-response-model')
}

exports.validations = {
  isObject: require('./validations/is-object'),
  isEmptyObject: require('./validations/is-empty-object'),
}

exports.utils = {
  mergeObjects: require('./utils/merge-objects'),
  throwErrorResponseModel: require('./utils/throw-error-response-model')
}

exports.database = {
  dbGateway: require('./database/db-gateway')
}

