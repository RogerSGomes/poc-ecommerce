import { Express, Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRouter {
  private _authRouter: Router = Router();

  constructor(private authController: AuthController) {}

  execute(expressApp: Express): void {
    this._authRouter.post('/sign-in', this.authController.handleAuthenticate);

    expressApp.use('/auth', this._authRouter);
  }
}
