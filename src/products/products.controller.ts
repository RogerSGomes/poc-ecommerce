import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  handleCreateProduct = async (req: Request, res: Response) => {
    const createProductDTO = req.body as CreateProductDTO;
    const createdProduct = await this.productsService.createProduct(createProductDTO);

    return res.status(201).json(createdProduct);
  };

  handleGetAllProducts = async (req: Request, res: Response) => {
    const allProducts = await this.productsService.getAllProducts();

    return res.status(200).json({
      result: allProducts,
      total: allProducts.length,
    });
  };

  handleGetProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const foundProduct = await this.productsService.getProductById(productId);

    return res.status(200).send(foundProduct);
  };
}
