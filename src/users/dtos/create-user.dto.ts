import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'O nome deve ser informado.' })
  @Expose()
  name!: string;

  @IsEmail({}, { message: 'O email não está em um formato válido.' })
  @IsString({ message: 'O email deve ser informado.' })
  @Expose()
  email!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    },
    { message: 'A senha deve conter no mínimo 8 caractéres, contendo letras maíusculas e minúsculas.' }
  )
  @IsString({ message: 'A senha deve ser informada.' })
  @Expose()
  password!: string;
}
