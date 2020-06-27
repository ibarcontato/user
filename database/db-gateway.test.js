const { handler } = require('./app');

describe(`docClient, method, tableName,
{ body, path, header, queryString, projectionExpression, expressionAttributeNames,
  keyConditionExpression, expressionAttributeValues, filterExpression } = {}`, () => {
  test('should return a successful object when request is valid, object exists and Id = 1', async () => {
    const event = {
      method: 'get',
      tableName: 'tableName',
      params: { path: { id: 1 }, header: { userId: 'userId' } }
    }

    const expected = {
      statusCode: 200,
      item: {
        id: 1,
        name: 'Test 1'
      }
    }

    const received = await handler(event);
    expect(received).toEqual(expected)

  })

//   test('should return a successful object when request is valid, object exists and Id = 2', async () => {
//     const event = {
//       method: 'get',
//       tableName: 'tableName',
//       params: { path: { id: 2 }, header: { userId: 'userId' } }
//     }

//     const expected = {
//       statusCode: 200,
//       item: {
//         id: 2,
//         name: 'Test 2'
//       }
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })

//   test('should return an empty object when request is valid and object does not exist', async () => {
//     const event = {
//       method: 'get',
//       tableName: 'tableName',
//       params: { path: { id: 3 }, header: { userId: 'userId' } }
//     }

//     const expected = {
//       statusCode: 200,
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })
// })

// describe('put method', () => {
//   test('should return an empty object when request is valid', async () => {
//     const event = {
//       method: 'put',
//       params: { path: { id: 1 }, header: { userId: 'userId' } },
//       body: { userId: '123456' },
//       tableName: 'tableName',
//       Item: {}
//     }

//     const expected = {
//       statusCode: 200,
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })

//   test('should return an empty object when request is valid and primary key already exists', async () => {
//     const event = {
//       method: 'put',
//       params: { path: { id: 1 }, header: { userId: 'userId' } },
//       body: { userId: '123456' },
//       tableName: 'tableName',
//       item: { some: {} }
//     }

//     const expected = {
//       statusCode: 200,
//     }

//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })
// })

// describe('delete method', () => {
//   test('should return an empty object when request is valid', async () => {
//     const event = {
//       method: 'delete',
//       params: { path: { id: 23 }, header: { userId: 'userId' } },
//       tableName: 'tableName',
//     }

//     const expected = {
//       statusCode: 200
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })

//   test('should return an empty object when request is valid and primary key does not exist', async () => {
//     const event = {
//       method: 'delete',
//       params: { path: { id: 23 }, header: { userId: 'userId' } },
//       tableName: 'tableName',
//     }

//     const expected = {
//       statusCode: 200
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })
// })

// describe('query method', () => {
//   test('should return an successful object when request is valid and Id = 1', async () => {
//     const event = {
//       method: 'query',
//       params: { path: {}, header: { userId: 'userId' } },
//       tableName: 'tableName',
//       keyConditionExpression: 'Id = :id',
//       expressionAttributeValues: {
//         ':id': 1
//       },
//     }

//     const expected = { items: [{ id: 1, name: 'Test 1' }], count: 1, scannedCount: 1, statusCode: 200 }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })

//   test('should return an successful object when request is valid and Id = 2', async () => {
//     const event = {
//       method: 'query',
//       params: { path: {}, header: { userId: 'userId' } },
//       tableName: 'tableName',
//       keyConditionExpression: 'Id = :id',
//       expressionAttributeValues: {
//         ':id': 2
//       },
//     }

//     const expected = {
//       items: [{ id: 2, name: 'Test 2' }],
//       count: 1,
//       scannedCount: 1,
//       statusCode: 200
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })

//   test('should return an success object when request is valid and primary key does not exist', async () => {
//     const event = {
//       method: 'query',
//       params: { path: {}, header: { userId: 'userId' } },
//       tableName: 'tableName',
//       keyConditionExpression: 'Id = :id',
//       expressionAttributeValues: {
//         ':id': 3
//       },
//     }

//     const expected = { items: [], count: 0, scannedCount: 0, statusCode: 200 }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })
// })

// describe('scan method', () => {
//   test('should return an successful object when request is valid', async () => {
//     const event = {
//       method: 'scan',
//       tableName: 'tableName',
//       params: { path: {}, header: { userId: 'userId' } },
//     }

//     const expected = {
//       statusCode: 200,
//       items: [
//         { id: 1, name: 'Test 1' },
//         { id: 2, name: 'Test 2' },
//       ],
//       count: 2,
//       scannedCount: 2
//     }
//     const received = await handler(event);
//     expect(received).toEqual(expected)
//   })
// })

// describe('errors', () => {
//   test('should return an error object when event.method is not "get", "put", "delete", "query" or "scan"', async () => {
//     const methods = [1, 's', true, null, [], () => { }];

//     for (let method of methods) {
//       const event = {
//         method: method,
//         params: { path: {}, header: { userId: 'userId' } },
//       }
//       const expected = JSON.stringify({
//         inputData: event,
//         errorMessage: 'method attribute must be "get", "put", "delete", "query" or "scan".',
//         statusCode: 400
//       })

//       try { await handler(event) } catch (received) { expect(received).toEqual(expected) }
//     }
//   })


//   test('should return an error object when event.tableName is not typeof string', async () => {
//     const tableNames = [1, true, null, [], () => { }, {}];

//     for (let tableName of tableNames) {
//       const event = {
//         method: 'get',
//         tableName: tableName,
//         params: { path: {}, header: { userId: 'userId' } },
//       }
//       const expected = JSON.stringify({
//         inputData: event,
//         errorMessage: 'tableName attribute must be a string.',
//         statusCode: 400
//       })
//       try { await handler(event) } catch (received) { expect(received).toEqual(expected) }
//     }
//   })


//   test('should return an error object when event.item is not an empty object and method = put', async () => {
//     const items = [1, true, null, [], () => { }, 's', undefined, {}];

//     for (let item of items) {
//       const event = {
//         method: 'put',
//         params: { path: {}, header: { userId: 'userId' } },
//         tableName: 'tableName',
//         item: item
//       }
//       const expected = JSON.stringify({
//         inputData: event,
//         errorMessage: 'item should not be empty.',
//         statusCode: 400
//       })
//       try { await handler(event) } catch (received) { expect(received).toEqual(expected) }
//     }
//   })

//   test('should return an error object when event.keyConditionExpression is not a zero length string in query methods', async () => {
//     const keyConditionExpressions = [1, true, null, [], () => { }, '', {}];

//     for (let keyConditionExpression of keyConditionExpressions) {
//       const event = {
//         method: 'query',
//         params: { path: {}, header: { userId: 'userId' } },
//         tableName: 'tableName',
//         keyConditionExpression: keyConditionExpression,
//         expressionAttributeValues: {},
//       }
//       const expected = JSON.stringify({
//         inputData: event,
//         errorMessage: 'keyConditionExpression attribute must have at least one character in put methods.',
//         statusCode: 400
//       })
//       try { await handler(event) } catch (received) { expect(received).toEqual(expected) }
//     }
//   })

//   test('should return an error object when event.expressionAttributeValues is not an object in query methods', async () => {
//     const expressionAttributeValues = [1, true, null, [], () => { }, '', undefined];

//     for (let expressionAttributeValue of expressionAttributeValues) {
//       const event = {
//         method: 'query',
//         params: { path: {}, header: { userId: 'userId' } },
//         tableName: 'tableName',
//         expressionAttributeValues: expressionAttributeValue,
//         ExpressionAttributeNames: {},
//         keyConditionExpression: 's'
//       }
//       const expected = JSON.stringify({
//         inputData: event,
//         errorMessage: 'expressionAttributeValues attribute must be an object in query methods.',
//         statusCode: 400
//       })
//       try { await handler(event) } catch (received) { expect(received).toEqual(expected) }
//     }
//   })

//   // test.only('should return an error object when some goes wrong on the database', async () => {
//   //   const event = {
//   //     method: 'get',
//   //     params: { path: { key: 'value' }, header: { userId: 'userId' } },
//   //     error: true,
//   //     tableName: 'tableName',
//   //   }

//   //   const expected = {
//   //     inputData: event,
//   //     errorMessage: 'errorMessage.',
//   //     statusCode: 'statusCode'
//   //   }
//   //   const [_, received] = await handler(event);
//   //   expect(received).toEqual(expected)
//   //   // handler(event).then(() => fail()).catch(received => expect(received).toEqual(expected));
//   // })

// })

// describe('createItem', () => {
//   // test('should return an successful object when request is valid', async () => {
//   //   const event = {
//   //     method: 'scan',
//   //     tableName: 'tableName',
//   //     params: { path: {} },
//   //   }

//   //   const expected = {
//   //     items: [
//   //       { id: 1, name: 'Test 1' },
//   //       { id: 2, name: 'Test 2' },
//   //     ],
//   //     count: 2,
//   //     scannedCount: 2
//   //   }
//   //   const [_, received] = await handler(event);
//   //   expect(received).toEqual(expected)
//   // })
})


