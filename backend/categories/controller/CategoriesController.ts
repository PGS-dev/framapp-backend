import Controller from '../../common/interfaces/Controller';
import * as express from 'express';
import {
  CONFIRMED_STATUS_CODES,
  ERROR_CODE_STATUS_CODES,
} from '../../common/status-codes/statusCodes';
import handleUnexpectedError from '../../common/utils/handleUnexpectedError';
import validationMiddleware from '../../common/middleware/validationMiddleware';
import PostCategoryDto from '../dto/PostCategoryDto';
import RequestWithUserId from '../../common/interfaces/RequestWithUserId';
import restoreAndVerifyToken from '../../common/middleware/restoreAndVerifyToken';
import CategoriesService from '../service/CategoriesService';
import UserService from '../../user/service/UserService';
import CategoryInterface from '../interfaces/CategoryInterface';

class CategoriesController implements Controller {
  public path = '/categories';

  public pathParam = '/:categoryId';

  public router = express.Router();

  private categoriesService = CategoriesService;

  private userService = UserService;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.all(`${this.path}/*`, restoreAndVerifyToken);
    this.router.all(this.path + this.pathParam, restoreAndVerifyToken);

    this.router.get(this.path, this.getCategories);
    this.router.post(this.path, validationMiddleware(PostCategoryDto), this.postCategory);
    this.router.get(this.path + this.pathParam, this.getCategoryById);
    this.router.put(this.path + this.pathParam, validationMiddleware(PostCategoryDto, true), this.editCategoryById);
    this.router.delete(this.path + this.pathParam, this.removeCategoryById);
  }

  private getCategories = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    try {
      const categories = await this.categoriesService.getCategories();
      response.status(CONFIRMED_STATUS_CODES.OK).json({ categories });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private postCategory = async (
      request: RequestWithUserId, response: express.Response,
      next: express.NextFunction) => {
    try {
      const category = {
        userId: request.userId,
        description: request.body.title,
        title: request.body.description,
      };
      const createdCategory: CategoryInterface = await this.categoriesService.createCategory(
          category);
      const updatedUser = await this.userService.addCategoryIdToUser(
          request.userId, createdCategory._id);

      response.status(CONFIRMED_STATUS_CODES.ACCEPTED).json({
        createdCategory,
        creator: { name: updatedUser.name },
      });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private getCategoryById = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    try {
      const category = await this.categoriesService.getCategoryById(
          request.params.categoryId);
      response.status(CONFIRMED_STATUS_CODES.OK).json({ category });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private editCategoryById = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    try {
      const updatedCategory = await this.categoriesService.updateCategoryById(
          request.params.categoryId, request.body);
      response.status(CONFIRMED_STATUS_CODES.OK).json({ updatedCategory });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private removeCategoryById = async (
      request: express.Request, response: express.Response,
      next: express.NextFunction) => {
    try {
      if (await this.categoryContainsProducts(request.params.categoryId)) {
        response.status(ERROR_CODE_STATUS_CODES.CONFLICT).
            json({ message: 'Category contains products remove it first' });
      }

      const removedCategory = await this.categoriesService.removeCategoryById(
          request.params.categoryId);
      await this.userService.removeCategoryIdFromUser(removedCategory.userId, removedCategory._id);

      response.status(CONFIRMED_STATUS_CODES.ACCEPTED).
          json({ removedCategory });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private categoryContainsProducts = async (categoryId: string) => {
    const category = await this.categoriesService.getCategoryById(categoryId);
    return category.products.length > 0;
  }
}

export default CategoriesController;
