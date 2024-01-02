import { PrismaClient } from '@prisma/client';

// DTOs
import { CreateProductDTO } from './dtos/create-product.dto';

export class ProductsService {
  constructor(private readonly prisma: PrismaClient) {}

  async createProduct(createProductDTO: CreateProductDTO) {
    const createdProduct = await this.prisma.product.create({
      data: {
        name: createProductDTO.name!,
        price: createProductDTO.price!,
      },
    });

    createProductDTO.categories?.map(async categoryId => {
      await this.prisma.productCategory.create({
        data: {
          productId: createdProduct.id,
          categoryId: categoryId,
        },
      });
    });

    return createdProduct;
  }

  async getAllProducts() {
    return await this.prisma.product.findMany();
  }

  async getProductById(productId: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        product_category_list: {
          select: { category: { select: { description: true } } },
        },
      },
    });
  }
}
