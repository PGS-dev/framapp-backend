import HttpException from '../../common/exepctions/HttpException';
import { ERROR_CODE_STATUS_CODES } from '../../common/status-codes/statusCodes';

class WrongPasswordException extends HttpException {
  constructor() {
    super(ERROR_CODE_STATUS_CODES.UNAUTHORIZED, 'Wrong Password');
  }
}

export default WrongPasswordException;
