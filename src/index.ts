import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config as dotenvConfig } from 'dotenv';

// Modules
import { ProductsModule } from './products/products.module';

// Handlers
import { ErrorHandler } from './shared/handlers';

dotenvConfig();

function bootstrap(applicationPort: number) {
  const expressApp = express();
  const productsModule = new ProductsModule(expressApp);
  const errorHandler = new ErrorHandler();

  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(cors({ origin: '*' }));

  productsModule.execute();

  expressApp.use(errorHandler.handle);

  expressApp.listen(applicationPort, () => {
    console.log(`Application is running at port ${applicationPort}. 🚀`);
  });

  process.on('beforeExit', async () => {
    console.log(`Application is running down.`);
  });
}

bootstrap(+process.env.PORT!);
