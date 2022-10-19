import * as bcrypt from 'bcrypt';

export function hashPassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}
