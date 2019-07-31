import * as express from 'express';
import { SERVER_STATUS_CODES } from '../status-codes/statusCodes';

function handleUnexpectedError(err: any, next: express.NextFunction) {
  if (!err.statusCode) {
    err.statusCode = SERVER_STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
  next(err);
}

export default handleUnexpectedError;
