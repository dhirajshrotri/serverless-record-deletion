import LambdaFunction from '@lib/LambdaFunction'
import {
  Property,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
  LambdaContainer,
  HttpStatusCode
} from './Framework'

import { TryJsonParse } from '@lib/utils/TryJsonParse'
import { Config } from '@config/config'

export abstract class APIGatewayLambda implements LambdaFunction {
  protected globalConfig : Config
  constructor(event: APIGatewayProxyEvent, context: Context) {

    if (LambdaContainer.isBound(Property.EVENT))
      LambdaContainer.rebind<APIGatewayProxyEvent>(Property.EVENT).toConstantValue(TryJsonParse(event))
    else LambdaContainer.bind<APIGatewayProxyEvent>(Property.EVENT).toConstantValue(TryJsonParse(event))

    if (LambdaContainer.isBound(Property.CONTEXT))
      LambdaContainer.rebind<Context>(Property.CONTEXT).toConstantValue(context)
    else LambdaContainer.bind<Context>(Property.CONTEXT).toConstantValue(context)

    if (LambdaContainer.isBound(Property.EVENT_BODY))
      LambdaContainer.rebind(Property.EVENT_BODY).toConstantValue(TryJsonParse(event.body))
    else LambdaContainer.bind(Property.EVENT_BODY).toConstantValue(TryJsonParse(event.body))
    this.globalConfig = LambdaContainer.get(Config)
  }

  abstract invoke(): Promise<object>

  async handler(): Promise<APIGatewayProxyResult | any> {
    try {
      return this.buildAPIGatewayResponse(HttpStatusCode.Ok, await this.invoke())
    } catch (err) {
      console.error(err)
      return this.buildAPIGatewayResponse(err.statusCode ?? HttpStatusCode.InternalServerError, err)
    } finally {
      //handle any end of lifecycle events here
      //for (const mysql of LambdaContainer.getAll(Mysql)) await mysql.end()
    }
  }

  private buildAPIGatewayResponse(statusCode: HttpStatusCode, res: string | object): APIGatewayProxyResult {
    let response: APIGatewayProxyResult = {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        'content-type': 'application/json'
      },
      body: typeof res === 'string' ? res : JSON.stringify(res),
      isBase64Encoded: false
    }

    return response
  }
}