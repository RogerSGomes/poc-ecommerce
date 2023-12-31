import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  handleAuthenticate = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const access_token = await this.authService.authenticate(login, password);

    res.send({ access_token });
  };
}
