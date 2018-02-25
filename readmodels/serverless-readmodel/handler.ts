import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  console.log(event)

  const response = {
    statusCode: 200,
    body: ''
  };

  cb(null, response);
}
