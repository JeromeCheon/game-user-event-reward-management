import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface CustomException {
  statusCode: number;
  message: string;
}

@Catch()
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const httpException = exception as HttpException;
      const status = httpException.getStatus();
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        data: httpException.getResponse(),
      });
    } else {
      if (typeof exception === 'object' && 'statusCode' in exception) {
        const status = (exception as CustomException).statusCode;
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          data: (exception as CustomException).message,
        });
      } else return response.status(500).json(exception);
    }
  }
}
