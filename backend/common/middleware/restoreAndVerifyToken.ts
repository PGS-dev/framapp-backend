import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exepctions/HttpException';
import { ERROR_CODE_STATUS_CODES } from '../status-codes/statusCodes';
import RequestWithUserId from '../interfaces/RequestWithUserId';
import { isProdEnvironment } from '../utils/isProdEnv';

async function restoreAndVerifyToken(
    request: RequestWithUserId, response: express.Response, next: express.NextFunction) {

  const token = getAuthHeader(request, next);
  const jwtSecretKey = isProdEnvironment ? process.env.SECRET_JWT_KEY : 'secret-dev-key';
  try {
    const decodedToken: any = jwt.verify(token, jwtSecretKey);
    request.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

function getAuthHeader(request: RequestWithUserId, next: express.NextFunction) {
  const authHeader = request.headers.authorization;
  if (request.headers && authHeader) {
    return authHeader.split(' ')[0];
  }

  next(new HttpException(ERROR_CODE_STATUS_CODES.UNAUTHORIZED, 'Missing header'));
}

export default restoreAndVerifyToken;
