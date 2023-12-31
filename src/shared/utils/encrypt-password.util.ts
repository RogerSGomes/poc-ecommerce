import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  return encryptedPassword;
}
