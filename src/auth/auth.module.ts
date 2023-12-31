import { Express } from 'express';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';

export class AuthModule {
  constructor(private readonly expressApp: Express, private readonly usersModule: UsersModule) {}

  execute() {
    const authService = new AuthService(this.usersModule.usersService);
    const authController = new AuthController(authService);
    const authRouter = new AuthRouter(authController);

    authRouter.execute(this.expressApp);
  }
}
