const { mergeObjects, throwErrorResponseModel } = require('../index').utils;
const { isObject, isEmptyObject } = require('../index').validations;
const { SuccessResponseModel } = require('../index').models;

const handler = async (docClient, method, tableName,
  {
    body,
    path,
    header,
    queryString,
    projectionExpression,
    expressionAttributeNames,
    keyConditionExpression,
    expressionAttributeValues,
    filterExpression
  } = {}
) => {

  if (!(method == 'get' || method == 'put' || method == 'delete' || method == 'scan' || method == 'query'))
    throwErrorResponseModel(method, 'method attribute must be "get", "put", "delete", "query" or "scan".')

  if (typeof tableName != 'string')
    throwErrorResponseModel(tableName, 'tableName attribute must be a string.')

  const key = path;
  if ((method == 'get' || method == 'delete') && isEmptyObject(key))
    throwErrorResponseModel(key, 'key should not be empty.')

  if (method == 'query' && !(typeof keyConditionExpression == 'string' && keyConditionExpression.length != 0))
    throwErrorResponseModel(keyConditionExpression, 'keyConditionExpression attribute must have at least one character in put methods.');

  if (method == 'query' && !isObject(expressionAttributeValues))
    throwErrorResponseModel(expressionAttributeValues, 'expressionAttributeValues attribute must be an object in query methods.');

  let item;
  if (method == 'put')
    item = await createItem(body, path);

  const dbParams = {
    TableName: tableName,
    Key: key,
    Item: item,
    ProjectionExpression: projectionExpression,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    FilterExpression: filterExpression,
    error: error
  }

  const result = await docClient[method](dbParams).promise();

  if (result.Payload && typeof result.Payload == 'string')
    result.Payload = JSON.parse(result.Payload);

  if (result.message || result.Payload && result.Payload.errorMessage)
    throwErrorResponseModel(inputData, result.message, result.statusCode);

  return new SuccessResponseModel({
    item: result.Item,
    items: result.Items,
    count: result.Count,
    scannedCount: result.ScannedCount,
    statusCode: 200
  });
};

async function createItem(body, path) {
  let item = {};
  for (let bodyKey in body)
    item[bodyKey] = body[bodyKey];

  for (let pathKey in path)
    item[pathKey] = path[pathKey];

  if (isEmptyObject(item))
    throwErrorResponseModel(item, 'item should not be empty.')

  const userId = header.userId;

  const actualItem = await getActualItem(event);
  const actualHistoricList = actualItem.historic == undefined ? [] : Object.assign([], actualItem.historic);
  actualItem.historic = undefined;
  const newHistoricItem = {
    datetime: `${new Date()}`,
    userId: userId,
    item: Object.assign({}, actualItem)
  }

  actualHistoricList.push(newHistoricItem);
  actualItem.historic = actualHistoricList;

  const mergedObject = mergeObjects(actualItem, item);

  return mergedObject;
}


async function getActualItem(tableName, params) {
  let dbParams = {
    tableName: tableName,
    method: 'get',
    params: params
  }
  const result = await handler(dbParams)

  return result.Item == undefined ? {} : result.Item;
}

module.exports = { handler };





