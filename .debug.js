const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

const debugResult = require('./utils/debug-result');
const { dbGateway } = require('./index').database;

const debugMethod = dbGateway(docClient, 'get', 'Users', {
  body: {},
  path: {
    id: 'aQFA3JTW5mKZS8jdAkwyBx'
  },
  header: {},
});

debugResult(debugMethod)