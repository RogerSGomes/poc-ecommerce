import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
require('express-async-errors');

// Modules
import { ProductsModule } from './products/products.module';

// Handlers
import { ErrorHandler } from './shared/handlers';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

dotenvConfig();

function bootstrap(applicationPort: number) {
  const expressApp = express();

  const productsModule = new ProductsModule(expressApp);
  const usersModule = new UsersModule(expressApp);
  const authModule = new AuthModule(expressApp, usersModule);

  const errorHandler = new ErrorHandler();

  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(cors({ origin: '*' }));

  productsModule.execute();
  usersModule.execute();
  authModule.execute();

  expressApp.use(errorHandler.handle);

  expressApp.listen(applicationPort, () => {
    console.log(`Application is running at port ${applicationPort}. 🚀`);
  });

  process.on('beforeExit', async () => {
    console.log(`Application is running down.`);
  });
}

bootstrap(+process.env.PORT!);
