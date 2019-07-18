import { CognitoIdentityServiceProvider } from 'aws-sdk'

const poolId = process.env.POOL_ID

var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider()

export const userApi = {
  getUserIdByUsername: (Username: string): Promise<any> => {
    return cognitoidentityserviceprovider
      .adminGetUser({
        UserPoolId: poolId,
        Username
      })
      .promise()
      .then(user => {
        if (user.UserStatus !== 'CONFIRMED') {
          throw new Error('user not confirmed')
        }

        const subAttr = user.UserAttributes.filter(attr => attr.Name === 'sub')
        if (subAttr.length !== 1) {
          throw new Error('invalid userid')
        }

        return subAttr[0].Value
      })
  },

  getUsernameByUserId: (userId: string): Promise<any> => {
    return cognitoidentityserviceprovider
      .listUsers({
        UserPoolId: poolId,
        Filter: `sub = "${userId}"`
      })
      .promise()
      .then(res => {
        if (res.Users.length === 1) {
          return res.Users[0].Username
        } else {
          console.log(JSON.stringify(res))
          throw new Error('user api error')
        }
      })
  },

  getUserByUserId: (userId: string): Promise<any> => {
    return cognitoidentityserviceprovider
      .listUsers({
        UserPoolId: poolId,
        Filter: `sub = "${userId}"`
      })
      .promise()
      .then(res => {
        if (res.Users.length === 1) {
          return res.Users[0]
        } else {
          console.log(JSON.stringify(res))
          throw new Error('user api error')
        }
      })
  },

  listUsers: ({ limit }: { limit: number }): Promise<any> => {
    return cognitoidentityserviceprovider
      .listUsers({
        UserPoolId: poolId,
        Limit: limit
      })
      .promise()
      .then(res => {
        return res.Users.filter(user => user.UserStatus === 'CONFIRMED')
      })
  },

  listAllUsers: (): Promise<any> => {
    return cognitoidentityserviceprovider
      .listUsers({
        UserPoolId: poolId
      })
      .promise()
      .then(res => {
        return res.Users.reduce(
          (acc, user) => ({
            ...acc,
            [user.Attributes.find(attr => attr.Name === 'sub').Value]:
              user.Username
          }),
          {}
        )
      })
  }
}
