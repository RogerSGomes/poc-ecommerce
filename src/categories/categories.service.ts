import { PrismaClient } from '@prisma/client';

// DTOs
import { CreateCategoryDTO } from './dtos';

export class CategoriesService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    return await this.prisma.category.create({
      data: {
        description: createCategoryDTO.description!,
      },
    });
  }
}
