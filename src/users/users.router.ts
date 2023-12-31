import { Express, Router } from 'express';
import { UsersController } from './users.controller';
import { RequestValidatorMiddleware } from '../shared/middlewares';
import { CreateUserDTO } from './dtos/create-user.dto';

export class UsersRouter {
  private _usersRouter: Router = Router();

  constructor(private readonly usersController: UsersController) {}

  execute(expressApp: Express): void {
    this._usersRouter.post(
      '/',
      RequestValidatorMiddleware.validateDTO(CreateUserDTO),
      this.usersController.handleCreateUser
    );

    expressApp.use('/users', this._usersRouter);
  }
}
