import Controller from '../../common/interfaces/Controller';
import * as express from 'express';
import validationMiddleware from '../../common/middleware/validationMiddleware';
import PostProductDto from '../dto/PostProductDto';
import { CONFIRMED_STATUS_CODES } from '../../common/status-codes/statusCodes';
import handleUnexpectedError from '../../common/utils/handleUnexpectedError';
import restoreAndVerifyToken from '../../common/middleware/restoreAndVerifyToken';
import ProductsService from '../service/ProductsService';
import CategoriesService from '../../categories/service/CategoriesService';
import ProductInterface from '../interfaces/ProductInterface';

class ProductsController implements Controller {
  public path = '/products';

  public pathParam = '/:productId';

  public router = express.Router();

  private productService = ProductsService;

  private categoriesService = CategoriesService;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.all(this.path, restoreAndVerifyToken);
    this.router.all(this.path + this.pathParam, restoreAndVerifyToken);

    this.router.get(this.path, this.getProducts);
    this.router.post(this.path, validationMiddleware(PostProductDto), this.createProduct);
    this.router.get(this.path + this.pathParam, this.getProductById);
    this.router.put(this.path + this.pathParam, validationMiddleware(PostProductDto, true), this.editProductById);
    this.router.delete(this.path + this.pathParam, this.removeProductById);
  }

  private getProducts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const products = await this.productService.getProducts();
      response.status(CONFIRMED_STATUS_CODES.OK).json({ products });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private createProduct = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const createdProduct: ProductInterface = await this.productService.createProduct(request.body);
      await this.categoriesService.addProductIdToCategory(createdProduct.categoryId, createdProduct._id);

      response.status(CONFIRMED_STATUS_CODES.CREATED).json({
        product: createdProduct,
      });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private getProductById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const product = await this.productService.getProductById(request.params.productId);
      response.status(CONFIRMED_STATUS_CODES.OK).json({ product });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private editProductById = async (
      request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const product = await this.productService.getProductById(request.params.productId);
      const updatedProduct = await this.productService.updateProductById(request.params.productId, request.body);
      const categoryId = request.body.categoryId;
      if (request.body.categoryId && (String(product.categoryId) !== String(categoryId))) {
        await this.categoriesService.removeProductIdFromCategory(product.categoryId, updatedProduct._id);
        await this.categoriesService.addProductIdToCategory(categoryId, updatedProduct._id);
      }

      response.status(CONFIRMED_STATUS_CODES.ACCEPTED).json({ product: updatedProduct });
    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }

  private removeProductById = async (
      request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const removedProduct = await this.productService.removeProductById(request.params.productId);
      await this.categoriesService.removeProductIdFromCategory(removedProduct.categoryId, removedProduct._id);
      response.json({ removedProduct });

    } catch (err) {
      handleUnexpectedError(err, next);
    }
  }
}

export default ProductsController;
