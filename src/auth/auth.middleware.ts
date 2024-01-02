import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Exceptions
import { ForbiddenException } from '../shared/exceptions';

export class AuthMiddleware {
  ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tokenType, jwt } = this.extractJwtFromHeaders(req.headers);

      const payload = verify(jwt, process.env.JWT_SECRET as string);

      if (tokenType !== 'Bearer') throw new ForbiddenException('O token deve ser do tipo bearerToken.');

      req.headers.user = JSON.stringify({ id: payload.sub });

      next();
    } catch (error: any) {
      next(new ForbiddenException(error.message));
    }
  };

  extractJwtFromHeaders = (headers: Request['headers']): { tokenType: string; jwt: string } => {
    const [tokenType, jwt] = headers.authorization ? headers.authorization.split(' ') : [];
    return { tokenType, jwt };
  };
}
