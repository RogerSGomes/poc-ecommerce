import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
  async handle(error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.status ?? 500).json(error);
    next();
  }
}
