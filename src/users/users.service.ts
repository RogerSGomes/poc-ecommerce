import { PrismaClient } from '@prisma/client';

// DTOs
import { CreateUserDTO } from './dtos/create-user.dto';

// Utils
import { encryptPassword } from '../shared/utils/encrypt-password.util';

export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const encryptedPassword = encryptPassword(createUserDTO.password);

    return await this.prisma.user.create({
      data: {
        name: createUserDTO.name,
        email: createUserDTO.email,
        password: encryptedPassword,
      },
    });
  }

  async findByLogin(login: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: login,
      },
    });
  }
}
