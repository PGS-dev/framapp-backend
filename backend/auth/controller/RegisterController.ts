import * as express from 'express';
import Controller from '../../common/interfaces/Controller';
import validationMiddleware from '../../common/middleware/validationMiddleware';
import RegisterDto from '../dto/RegisterDto';
import SameRegistrationEmailException from '../exceptions/SameRegistrationEmailException';
import { AvailableRoles } from '../../common/roles/AvailableRoles';
import handleUnexpectedError from '../../common/utils/handleUnexpectedError';
import { CONFIRMED_STATUS_CODES } from '../../common/status-codes/statusCodes';
import UserInterface from '../../user/interfaces/UserInteface';
import UserService from '../../user/service/UserService';
import generateHashedPassword from '../../common/utils/generateHashedPassword';

class RegisterController implements Controller {
  public path = '/sign-in';

  public router = express.Router();

  private userService = UserService;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(RegisterDto), this.registerUser);
  }

  private registerUser = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    const userObject: UserInterface = {
      email: request.body.email,
      name: request.body.name,
      surname: request.body.surname,
      role: AvailableRoles.USER,
      password: request.body.password,
    };

    try {
      const foundUser = await this.userService.findUserByEmail(
          request.body.email);

      if (foundUser) {
        next(new SameRegistrationEmailException(request.body.email));
      } else {
        userObject.password = await generateHashedPassword(userObject.password);

        const createdUser = await this.userService.createUser(userObject);
        userObject.password = null;
        response.status(CONFIRMED_STATUS_CODES.CREATED).
            json({ userId: createdUser._id });
      }

    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }
}

export default RegisterController;
