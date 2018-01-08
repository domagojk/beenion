import * as jwksClient from 'jwks-rsa'
import { decode, verify } from 'jsonwebtoken'

const AUDIENCE = process.env.AUDIENCE
const TOKEN_ISSUER = process.env.TOKEN_ISSUER
const JWKS_URI = process.env.JWKS_URI

const getToken = function (event) {
  if (!event.type || event.type !== 'TOKEN') {
    throw new Error("Expected 'event.type' parameter to have value TOKEN")
  }

  const tokenString = event.authorizationToken
  if (!tokenString) {
    throw new Error("Expected 'event.authorizationToken' parameter to be set")
  }

  const match = tokenString.match(/^Bearer (.*)$/)
  if (!match || match.length < 2) {
    throw new Error(
      "Invalid Authorization token - '" +
        tokenString +
        "' does not match 'Bearer .*'"
    )
  }
  return match[1]
}

const generatePolicy = function (principalId, effect, resource) {
  let authResponse = {
    principalId,
    policyDocument: null
  }

  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }

    authResponse.policyDocument = policyDocument
  }

  return authResponse
}

const authenticate = function (event, cb) {
  const token = getToken(event)
  console.log('token', token)

  const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: JWKS_URI
  })

  const decoded = decode(token, { complete: true })
  const kid = decoded.header.kid
  client.getSigningKey(kid, function (err, key) {
    if (err) {
      cb(err)
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey
      verify(
        token,
        signingKey,
        { audience: AUDIENCE, issuer: TOKEN_ISSUER },
        function (err, decoded) {
          if (err) {
            cb(err)
          } else {
            cb(null, decoded)
          }
        }
      )
    }
  })
}

export const auth = (event, _context, callback) => {
  authenticate(event, function (err, decoded) {
    if (err) {
      console.log(err)
      return callback('Unauthorized')
    } else {
      return callback(
        null,
        generatePolicy(decoded.sub, 'Allow', event.methodArn)
      )
    }
  })
}
