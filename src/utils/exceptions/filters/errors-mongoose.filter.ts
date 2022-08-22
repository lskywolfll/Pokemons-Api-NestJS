import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    // this variable status only use when have tipical exceptions in nestjs
    // const status = exception.getStatus();
    let status;

    switch (exception.code) {
      case 11000:
        status = HttpStatus.BAD_REQUEST;
        // duplicate exception
        // do whatever you want here, for instance send error to client
        response.status(status).json({
          statusCode: status,
          message: `Data exist in db ${JSON.stringify(request.body)}`,
        });
    }
  }
}
