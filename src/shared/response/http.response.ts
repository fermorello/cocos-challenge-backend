import { Response } from 'express';

export enum HttpStatus {
  OK = 200,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: 'Success',
      data,
    });
  }
  NoContent(res: Response): Response {
    return res.status(HttpStatus.NO_CONTENT).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'No Content',
    });
  }
  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'Not Found',
      error: data,
    });
  }
  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: 'Unauthorized',
      error: data,
    });
  }
  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: 'Forbidden',
      error: data,
    });
  }
  ERROR(res: Response, error?: unknown): Response {
    if (error instanceof Error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        statusMsg: 'Internal Server Error',
        error: error.message,
      });
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal Server Error',
      error: error,
    });
  }
}
