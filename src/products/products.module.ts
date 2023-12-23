import { Express } from "express";
import { PrismaClient } from "@prisma/client";

import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRouter } from "./products.router";

export class ProductsModule {
  constructor(private readonly expressApp: Express) {}

  execute() {
    const prismaClient = new PrismaClient();
    const productsService = new ProductsService(prismaClient);
    const productsController = new ProductsController(productsService);
    const productsRouter = new ProductsRouter(productsController);

    productsRouter.execute(this.expressApp);
  }
}
