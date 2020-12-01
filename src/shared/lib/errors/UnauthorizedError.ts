import { LambdaError, HttpStatusCode } from '@lib/Framework'

export class UnauthorizedError extends LambdaError {
  constructor(
    errorMessage = 'Unauthorized User. Ensure that user is in the correct cognito user group.',
    stackTrace?: string,
    userMessage = 'User is not authorized!',
    statusCode = HttpStatusCode.Unauthorized
  ) {
    super(errorMessage, stackTrace, userMessage, statusCode)
  }
}
