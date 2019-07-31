import CategoriesService from '../../backend/categories/service/CategoriesService';
import ProductInterface from '../../backend/products/interfaces/ProductInterface';
import ProductsService from '../../backend/products/service/ProductsService';
import { sampleProducts } from './data/sampleProducts';
import DataBaseConnector from './DataBaseConnector';

class CreateProducts {

  private productsService = ProductsService;

  private categoriesService = CategoriesService;

  private dataBaseConnector = DataBaseConnector;

  public init = async () => {
    await this.dataBaseConnector.connect();
    await this.dataBaseConnector.closeConnection();

    await this.createProducts(sampleProducts);
    console.log('Products created');

    this.dataBaseConnector.closeConnection();
  }

  private createProducts = async (sampleProductsData: ProductInterface[]) => {
    let categories: any;
    categories = await this.categoriesService.getCategories();

    sampleProductsData.forEach(async (product: ProductInterface, idx: number) => {
      product.categoryId = categories[idx] ?
          categories[idx].id :
          categories[0].id;
      const newProduct = await this.createProduct(product);
      await this.categoriesService.addProductIdToCategory(newProduct.categoryId, newProduct._id);
    });
  }

  private createProduct = async (product: ProductInterface) => {
    return this.productsService.createProduct({
      amount: product.amount,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      promoted: product.promoted,
      title: product.title,
      categoryId: product.categoryId,
    });
  }
}

export default new CreateProducts().init();
