import * as express from 'express';
import Controller from '../../common/interfaces/Controller';
import handleUnexpectedError from '../../common/utils/handleUnexpectedError';
import { CONFIRMED_STATUS_CODES } from '../../common/status-codes/statusCodes';
import restoreAndVerifyToken from '../../common/middleware/restoreAndVerifyToken';
import UserService from '../service/UserService';

class UserController implements Controller {
  public path = '/users';

  public router = express.Router();

  private userService = UserService;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.all(this.path, restoreAndVerifyToken);
    this.router.get(this.path, this.getAllUsers);
  }

  private getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      response.status(CONFIRMED_STATUS_CODES.OK).json({ users });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }
}

export default UserController;
