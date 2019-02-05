import 'source-map-support/register'
import { DynamoDB } from 'aws-sdk'
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'

const region = process.env.REGION || 'us-east-1'
const linksTable = process.env.LINKS_TABLE || 'links'
const dynamoClient = new DynamoDB.DocumentClient({ region })

export const handler = async (event, context, cb) => {
  if (!event.queryStringParameters || !event.queryStringParameters.linkHash) {
    return cb(null, makeErrorResponse(404, 'link not found'))
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
        return cb(null, makeErrorResponse(404, 'link not found'))
      } else {
        return cb(null, makeSuccessResponse(data))
      }
    })
    .catch(err => {
      cb(null, makeErrorResponse(err))
    })
}
