import CategoryInterface from '../../backend/categories/interfaces/CategoryInterface';
import UserService from '../../backend/user/service/UserService';
import { sampleCategories } from './data/sampleCategories';
import CategoriesService from '../../backend/categories/service/CategoriesService';
import DataBaseConnector from './DataBaseConnector';

class CreateCategories {

  private userService = UserService;

  private categoriesService = CategoriesService;

  private dataBaseConnector = DataBaseConnector;

  public init = async () => {
    this.dataBaseConnector.connect();
    this.dataBaseConnector.checkConnection();

    await this.createCategories(sampleCategories);
    console.log('Categories created');

    this.dataBaseConnector.closeConnection();
  }

  private createCategories = async (sampleCategoriesData: any) => {
    const user = await this.userService.findUserByEmail('admin@admin.com');

    await sampleCategoriesData.forEach(async (category: any) => {
      category.userId = user._id;
      const newCategory = await this.createCategory(category);
      await this.userService.addCategoryIdToUser(category.userId, newCategory._id);
    });
  }

  private createCategory = async (category: CategoryInterface) => {
    return this.categoriesService.createCategory({
      userId: category.userId,
      description: category.description,
      title: category.title,
    });
  }

}

export default new CreateCategories().init();
