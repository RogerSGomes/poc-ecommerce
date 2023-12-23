import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

// Exceptions
import { BadRequestException } from '../exceptions';

export class RequestValidatorMiddleware {
  static validateDTO = <T extends object>(DTOInstance: ClassConstructor<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const builtDTO = plainToInstance(DTOInstance, req.body, { excludeExtraneousValues: true });

      validateOrReject(builtDTO)
        .then(() => {
          req.body = builtDTO;
          next();
        })
        .catch((validationErrors: ValidationError[]) => {
          const errorMessage = Object.values(validationErrors[0].constraints!)[0];
          next(new BadRequestException(errorMessage));
        });
    };
  };
}
