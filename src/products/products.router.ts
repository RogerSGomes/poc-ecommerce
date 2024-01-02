import { Express, Router } from 'express';

// Middlewares
import { AuthMiddleware } from '../auth/auth.middleware';
import { RequestValidatorMiddleware } from '../shared/middlewares';

// DTOs
import { CreateProductDTO } from './dtos/create-product.dto';

// Controllers
import { ProductsController } from './products.controller';

export class ProductsRouter {
  private _productsRouter: Router = Router();

  constructor(private readonly productsController: ProductsController) {}

  execute(expressApp: Express): void {
    this._productsRouter.post(
      '/',
      RequestValidatorMiddleware.validateDTO(CreateProductDTO),
      this.productsController.handleCreateProduct
    );
    this._productsRouter.get(
      '/',
      new AuthMiddleware().ensureAuthenticated,
      this.productsController.handleGetAllProducts
    );
    this._productsRouter.get('/:productId', this.productsController.handleGetProductById);

    expressApp.use('/products', this._productsRouter);
  }
}
