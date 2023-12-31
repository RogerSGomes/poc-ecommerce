import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRouter } from './users.router';

export class UsersModule {
  usersService!: UsersService;

  constructor(private readonly expressApp: Express) {}

  execute() {
    const prismaClient = new PrismaClient();
    this.usersService = new UsersService(prismaClient);
    const usersController = new UsersController(this.usersService);
    const usersRouter = new UsersRouter(usersController);

    usersRouter.execute(this.expressApp);
  }
}
