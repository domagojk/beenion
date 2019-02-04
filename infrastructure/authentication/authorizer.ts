import jwksClient from 'jwks-rsa'
import { decode, verify } from 'jsonwebtoken'

const region = process.env.REGION
const poolId = process.env.POOL_ID

export function handler (event, context, cb) {
  authenticate(event, function(err, decoded) {
    if (err) {
      console.log(err)
      return cb('Unauthorized')
    } else {
      return cb(
        null,
        generatePolicy(
          {
            sub: decoded.sub,
          },
          'Allow',
          '*'
        )
      )
    }
  })
}

function generatePolicy (tokenData, effect, resource) {
  let authResponse = {
    principalId: JSON.stringify(tokenData),
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

function getToken (event) {
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


const authenticate = function(event, cb) {
  let token
  try {
    token = getToken(event)
  } catch (err) {
    console.log('could not get token', event, err)
    return cb('could not get token')
  }

  const decoded = decode(token, { complete: true })
  if (!decoded) {
    return cb('could not decode token')
  }

  const kid = decoded.header.kid
  const TOKEN_ISSUER = `https://cognito-idp.${region}.amazonaws.com/${poolId}`
  const JWKS_URI = `${TOKEN_ISSUER}/.well-known/jwks.json`

  const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: JWKS_URI
  })

  client.getSigningKey(kid, function(err, key) {
    if (err) {
      cb(err)
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey
      verify(token, signingKey, { issuer: TOKEN_ISSUER }, function(
        err,
        tokenPayload
      ) {
        if (err) {
          cb(err)
        } else {
          cb(null, {
            sub: tokenPayload.sub
          })
        }
      })
    }
  })
}
