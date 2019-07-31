import * as bcrypt from 'bcryptjs';

const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export default generateHashedPassword;
