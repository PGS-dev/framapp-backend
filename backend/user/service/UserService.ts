import UserModel from '../model/UserModel';
import UserInterface from '../interfaces/UserInteface';

class UserService {

  private userModel = UserModel;

  public getAllUsers = async () => {
    return this.userModel.find().select('name surname role categories');
  }

  public createUser = async (userObject: UserInterface) => {
    const userModel = new UserModel({
      password: userObject.password,
      name: userObject.name,
      surname: userObject.surname,
      email: userObject.email,
      role: userObject.role,
    });
    return userModel.save();
  }

  public findUserByEmail = async (email: string) => {
    return this.userModel.findOne({ email });
  }

  public addCategoryIdToUser = async (userId: string, categoryId: string) => {
    return this.userModel.update({ _id: userId }, { $push: { categories: categoryId } });
  }

  public removeCategoryIdFromUser = async (userId: string, categoryId: string) => {
    return this.userModel.update({ _id: userId }, { $pull: { categories: categoryId } });
  }
}

export default new UserService();
