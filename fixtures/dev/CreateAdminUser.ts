import UserService from '../../backend/user/service/UserService';
import DataBaseConnector from './DataBaseConnector';
import generateHashedPassword from '../../backend/common/utils/generateHashedPassword';
import { AvailableRoles } from '../../backend/common/roles/AvailableRoles';

class CreateAdminUser {

  private userService = UserService;

  private dataBaseConnector = DataBaseConnector;

  public init = async () => {
    this.dataBaseConnector.connect();
    this.dataBaseConnector.checkConnection();

    await this.createAdminUser();
    console.log('Admin created');

    this.dataBaseConnector.closeConnection();
  }

  private createAdminUser = async () => {
    const pass = await generateHashedPassword('admin');
    return this.userService.createUser({
      password: pass,
      name: 'admin',
      surname: 'super user',
      email: 'admin@admin.com',
      role: AvailableRoles.ADMIN,
    });
  }
}

export default new CreateAdminUser().init();
