const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();
const { isObject, isEmptyObject, SuccessResponseModel, mergeObjects, throwErrorResponseModel } = require('ibar');

const handler = async (docClient, ) => {
  if (isEmptyObject(event))
    throwErrorResponseModel(event, '"event" should not be an empty object.');

  const body = event.body;
  const pathParams = event.params.path;
  const headerParams = event.params.header;
  // const queryParams = event.params.queryString;
  const projectionExpression = event.projectionExpression;
  const expressionAttributeNames = event.expressionAttributeNames;
  const filterExpression = event.filterExpression;

  const method = event.method;
  if (!(method == 'get' || method == 'put' || method == 'delete' || method == 'scan' || method == 'query'))
    throwErrorResponseModel(event, 'method attribute must be "get", "put", "delete", "query" or "scan".')

  const tableName = event.tableName;
  if (typeof tableName != 'string')
    throwErrorResponseModel(event, 'tableName attribute must be a string.')

  const key = pathParams;
  if ((method == 'get' || method == 'delete') && isEmptyObject(key))
    throwErrorResponseModel(event, 'key should not be empty.')

  const keyConditionExpression = event.keyConditionExpression;
  if (method == 'query' && !(typeof keyConditionExpression == 'string' && keyConditionExpression.length != 0))
    throwErrorResponseModel(event, 'keyConditionExpression attribute must have at least one character in put methods.');

  const expressionAttributeValues = event.expressionAttributeValues;
  if (method == 'query' && !isObject(expressionAttributeValues))
    throwErrorResponseModel(event, 'expressionAttributeValues attribute must be an object in query methods.');

  let item;
  if (method == 'put')
    item = await createItem(event);

  const dbParams = {
    TableName: tableName,
    Key: key,
    Item: item,
    ProjectionExpression: projectionExpression,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    FilterExpression: filterExpression,
    error: event.error
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

async function createItem(event) {
  let item = {};
  for (let bodyKey in event.body)
    item[bodyKey] = event.body[bodyKey];

  for (let pathKey in event.params.path) 
    item[pathKey] = event.params.path[pathKey];

  if (isEmptyObject(item)) 
    throwErrorResponseModel(event, 'item should not be empty.')

  if (isEmptyObject(event.params.header)) 
    throwErrorResponseModel(event, '"event.params.header" should not be an empty object.');

  if (typeof event.params.header.userId != 'string') 
    throwErrorResponseModel(event, '"event.params.header.userId" should be string.');

  const userId = event.params.header.userId;
  
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


async function getActualItem(event) {
  let dbParams = {
    tableName: event.tableName,
    method: 'get',
    params: event.params
  }
  const result = await handler(dbParams)

  return result.Item == undefined ? {} : result.Item;
}

module.exports = { handler };





