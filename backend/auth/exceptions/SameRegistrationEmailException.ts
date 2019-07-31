import HttpException from '../../common/exepctions/HttpException';
import { ERROR_CODE_STATUS_CODES } from '../../common/status-codes/statusCodes';

class SameRegistrationEmailException extends HttpException {
  constructor(email: string) {
    super(ERROR_CODE_STATUS_CODES.CONFLICT, `This email: ${email} was registered`);
  }
}

export default SameRegistrationEmailException;
