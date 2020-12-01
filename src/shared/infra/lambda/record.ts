import {
  APIGatewayLambda,
  LambdaContainer,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  LambdaError
} from '@lib/Framework';
import "reflect-metadata";
import { inject } from 'inversify';
import { RecordService } from '@lib/services/RecordService';

console.log(">>> Lambda handler init ...!!!!");


class RecordsLambda extends APIGatewayLambda {
    @inject(RecordService) private RecordService: RecordService
  
    constructor(private readonly event: APIGatewayProxyEvent, private readonly context: Context) {
      super(event, context)
    }
  
    async invoke(): Promise<object> {
      try {
        return  await LambdaContainer.get(RecordService).getRecords(this.event.queryStringParameters["fromDate"], this.event.queryStringParameters['toDate'])
      } catch (err) {
        throw new LambdaError(err.message, err.stack, 'Failed to Test Lambda!')
      }
    }
}
  
export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  // return  new RecordsLambda(event, context).handler()
  return await this.RecordService.getRecords(event.queryStringParameters["fromDate"], event.queryStringParameters['toDate'])
}