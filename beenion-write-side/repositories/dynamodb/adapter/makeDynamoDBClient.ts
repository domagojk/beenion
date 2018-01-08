import * as AWS from 'aws-sdk'

const dynamodb = new AWS.DynamoDB()

export const makeDynamoDBClient = entityName => ({
  loadEvents: entityId => {
    const params = {
      TableName: process.env.EVENTSTORE_TABLE,
      ConsistentRead: true,
      KeyConditionExpression: 'entityId = :id',
      ExpressionAttributeValues: {
        ':id': { S: entityId }
      }
    }

    return dynamodb
      .query(params)
      .promise()
      .then(loadedEvents => {
        if (loadedEvents.Count === 0) {
          throw new Error(`${entityName} not found`)
        }

        let items = []
        loadedEvents.Items.forEach(item => {
          const commitedEvents = JSON.parse(item.events.S)
          commitedEvents.forEach(event => {
            items.push(event)
          })
        })

        return items
      })
  },
  append: (entityId, version, events) => {
    const now = Date.now()
    const date = new Date(now).toISOString().replace(/[^0-9]/g, '')
    const commitId = date + ':' + entityId

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        commitId: { S: commitId },
        committedAt: { N: now.toString() },
        entityId: { S: entityId },
        entityName: { S: entityName },
        version: { N: version.toString() },
        events: { S: JSON.stringify(events) }
      },
      ConditionExpression: 'attribute_not_exists(version)',
      ReturnValues: 'NONE'
    }

    return dynamodb
      .putItem(params)
      .promise()
      .catch(function (err) {
        if (err.name === 'ConditionalCheckFailedException') {
          throw new Error('A commit already exists with the specified version')
        }

        throw err
      })
  }
})
