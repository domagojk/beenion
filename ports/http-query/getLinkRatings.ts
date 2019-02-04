import 'source-map-support/register'
import { DynamoDB } from 'aws-sdk'
import { makeResponse } from '../../infrastructure/http/makeResponse'

const region = process.env.REGION || 'us-east-1'
const linksTable = process.env.LINKS_TABLE || 'links'
const dynamoClient = new DynamoDB.DocumentClient({ region })

export const handler = async (event, context, cb) => {
  if (!event.queryStringParameters || !event.queryStringParameters.linkHash) {
    return cb(
      null,
      makeResponse(404, {
        message: 'link not found',
        errorCode: 404
      })
    )
  }

  const linkHash = event.queryStringParameters.linkHash

  return dynamoClient
    .get({
      TableName: linksTable,
      Key: {
        linkHash
      }
    })
    .promise()
    .then(res => {
      return res.Item
    })
    .then(data => {
      if (!data) {
        return cb(
          null,
          makeResponse(404, {
            message: 'link not found',
            errorCode: 404
          })
        )
      } else {
        return cb(null, makeResponse(200, data))
      }
    })
    .catch(err => {
      console.error(err)
      cb(
        null,
        makeResponse(err.statusCode || 500, {
          message: err.message,
          errorCode: err.code
        })
      )
    })
}
