import * as bcrypt from 'bcrypt';
export const hashPass = async (password: string) => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export const isPassMatch = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
