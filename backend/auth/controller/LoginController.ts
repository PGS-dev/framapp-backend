import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import Controller from '../../common/interfaces/Controller';
import LoginDto from '../dto/LoginDto';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import WrongPasswordException from '../exceptions/WrongPasswordException';
import { CONFIRMED_STATUS_CODES } from '../../common/status-codes/statusCodes';
import createJwtToken from '../../common/utils/createJwtToken';
import handleUnexpectedError from '../../common/utils/handleUnexpectedError';
import validationMiddleware from '../../common/middleware/validationMiddleware';
import UserService from '../../user/service/UserService';

class LoginController implements Controller {
  public path = '/login';

  public router = express.Router();

  private userService = UserService;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(LoginDto), this.loginUser);
  }

  private loginUser = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    const email = request.body.email;
    const password = request.body.password;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        next(new UserNotFoundException(email));
      }

      if (await this.comparePasswords(password, user.password)) {
        const token = createJwtToken(user.email, user._id);
        response.status(CONFIRMED_STATUS_CODES.OK).
            json({ token, userId: user._id });
      } else {
        next(new WrongPasswordException());

      }

    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private comparePasswords = async (password: string, userPassword: string) => {
    return bcrypt.compare(password, userPassword);
  }
}

export default LoginController;
