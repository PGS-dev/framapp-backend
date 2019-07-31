import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { ERROR_CODE_STATUS_CODES } from '../status-codes/statusCodes';
import HttpException from '../exepctions/HttpException';

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(ERROR_CODE_STATUS_CODES.BAD_REQUEST, message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
