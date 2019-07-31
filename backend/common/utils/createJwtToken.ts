import * as jwt from 'jsonwebtoken';
import { isProdEnvironment } from './isProdEnv';

function createJwtToken(email: string, userId: string) {

  const jwtSecretKey = isProdEnvironment ? process.env.SECRET_JWT_KEY : 'secret-dev-key';

  return jwt.sign({ email, userId }, jwtSecretKey, { expiresIn: process.env.JWT_EXPIRED || '1h' });
}

export default createJwtToken;
