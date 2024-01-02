import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '../shared/exceptions';

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(login: string, password: string) {
    const foundUser = await this.usersService.findByLogin(login);

    if (!foundUser) throw new UnauthorizedException('Usuário ou senha incorretos.');

    const isValidPassword = bcrypt.compareSync(password, foundUser.password);

    if (!isValidPassword) throw new UnauthorizedException('Usuário ou senha incorretos.');

    const access_token = sign(
      {
        sub: foundUser.id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: `${60 * 60 * 24}s` } // Expires in 1 day
    );

    return access_token;
  }
}
