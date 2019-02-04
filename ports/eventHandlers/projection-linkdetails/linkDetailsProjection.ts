import { Event } from '../../../model/eventTypes'
import { DynamoDB } from 'aws-sdk'
import md5 from 'md5'
import { linkDetailsReducer, Link } from './linkDetailsReducer'

const region = process.env.REGION || 'us-east-1'
const linksTable = process.env.LINKS_TABLE || 'links'
const dynamoClient = new DynamoDB.DocumentClient({ region })

export async function linkDetailsProjection(e: Event): Promise<any> {
  if (
    e.type === 'LINK_CREATED' ||
    e.type === 'LINK_TITLE_UPDATED' ||
    e.type === 'LINK_IMAGE_UPDATED' ||
    e.type === 'LINK_RATED' ||
    e.type === 'LINK_TAGGED'
  ) {
    const link: Link = await getLink(md5(e.payload.linkUrl))
    const newLink = linkDetailsReducer([e], link)

    return dynamoClient
      .put({
        TableName: linksTable,
        Item: newLink,
        ReturnValues: 'NONE'
      })
      .promise()
  }
  return Promise.resolve()
}

function getLink(linkHash) {
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
}
