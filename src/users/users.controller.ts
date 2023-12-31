import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  handleCreateUser = async (req: Request, res: Response) => {
    const createUserDTO = req.body as CreateUserDTO;
    const createdUser = await this.usersService.createUser(createUserDTO);

    res.status(201).json(createdUser);
  };
}
