# Blog references

A list of links pointing to a source when a specific blog post is written:

- [**Feb 6, 2019**](https://github.com/domagojk/beenion/tree/beenion-aws-2) ([Serverless Event Sourcing in AWS (Lambda, DynamoDB, SQS)](https://medium.com/@domagojk/serverless-event-sourcing-in-aws-lambda-dynamodb-sqs-7237d79aed27))
- [**Jan 8, 2018**](https://github.com/domagojk/beenion/tree/blog-patterns) ([Patterns for designing flexible architecture in node.js](https://medium.com/@domagojk/patterns-for-designing-flexible-architecture-in-node-js-cqrs-es-onion-7eb10bbefe17))

# User Interface

- [Homepage (React app)](https://github.com/domagojk/beenion-web)
- [Chrome Rater (React app)](https://github.com/domagojk/beenion-chrome-rater)

# Requirements 

- [Serverless framework](https://serverless.com/) installed.
- [AWS CLI](https://aws.amazon.com/cli/) to create a Cognito user (see testing the apis)

# Deployment 	

Adjust .env to your AWS_REGION - you can optionally change the application name.	

```	
npm install	
sls deploy	
```	

will create a cloudformation stack with lambda functions and other required AWS resources.	

`sls info -v` will show information about the stack including api endpoints.	

# Creating a Cognito User 	

The command and queries use a Cognito Api Gateway authorizer for authentication. A cognito user needs to be created in the user pool in order to test the apis.	

* In the AWS console navigate to Cognito -> Manage User Pools -> beenion-dev (default name)	
* Take note of the following 	

  - "Pool Id" under General Settings <POOL_ID>	
  - "App Client ID" under app client <APPCLIENT_ID>	


 As a cognito user needs to go through a signup and confirmation process typically done from a website - its easiest to create and confirm the cognito user using the awscli with admin credentials.	

 * Create and confirm User with temp password	
 ```	
 aws cognito-idp admin-create-user \	
  --user-pool-id <POOL_ID> \	
  --username <USER_EMAIL> \	
  --temporary-password 'TempPassword123!' \	
  --message-action SUPPRESS  	
aws cognito-idp admin-initiate-auth \	
 --user-pool-id <POOL_ID> \	
 --client-id <APPCLIENT_ID> \	
 --auth-flow ADMIN_NO_SRP_AUTH \	
 --auth-parameters USERNAME='<YOUR_EMAIL>',PASSWORD='TempPassword123!'	
 ```	
 Take note of the long session string in the response 	
 * Reset the users password 	
 ```	
 aws cognito-idp admin-respond-to-auth-challenge \	
  --challenge-name 'NEW_PASSWORD_REQUIRED' \	
  --user-pool-id <POOL_ID> \	
  --client-id <APPCLIENT_ID> \	
  --challenge-responses USERNAME='<YOUR_EMAIL>',NEW_PASSWORD='<YOUR_PASSWORD>' \	
  --session '<REPLACE_WITH_SESSION_STRING_FROM_PREVIOUS_COMMAND'   	
```	
* Get an ID Token 	
```	
aws cognito-idp admin-initiate-auth \	
 --user-pool-id <POOL_ID> \	
 --client-id <APPCLIENT_ID> \	
 --auth-flow ADMIN_NO_SRP_AUTH \	
 --auth-parameters USERNAME='<YOUR_EMAIL>',PASSWORD='<YOUR_PASSWORD>'	
 ```	

* Testing the apis	

Use the idtoken above in the Authorization header. Example of posting to the linkCommand handler	

```	
curl --request POST \	
  --url https://<YOUR_API_GW_ENDPOINT>/dev/linkCommand \	
  --header 'Authorization: <REPLACE_WITH_ID_TOKEN>' \	
  --header 'Content-Type: application/json' \	
  --data '{"type": "rate",\n "payload": {\n"linkUrl": "https://www.github.com",\n"rating": 10\n}\n}'	
```
