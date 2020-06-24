const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

const { handler } = require('./database/db-gateway');

const debugResult = require('./utils/debug-result');

const debugMethod = handler(docClient, 'get', 'Users', {
  body: {},
  path: {
    id: '1'
  },
  header: {},
});

debugResult(debugMethod)