import HttpException from '../../common/exepctions/HttpException';
import { ERROR_CODE_STATUS_CODES } from '../../common/status-codes/statusCodes';

class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(ERROR_CODE_STATUS_CODES.NOT_FOUND, `User with this email: ${email} not exist`);
  }
}

export default UserNotFoundException;
