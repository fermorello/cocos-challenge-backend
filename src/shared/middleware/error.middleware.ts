import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
  static error(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
