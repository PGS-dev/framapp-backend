import ProductModel from '../model/ProductModel';
import ProductInterface from '../interfaces/ProductInterface';

class ProductsService {

  private productModel = ProductModel;

  public getProducts = async () => {
    return this.productModel.find();
  }

  public getProductById = async (productId: string) => {
    return this.productModel.findById(productId);
  }

  public createProduct = async (product: ProductInterface) => {
    const newProduct = new ProductModel({
      amount: product.amount,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      promoted: product.promoted,
      title: product.title,
      categoryId: product.categoryId,
    });
    return newProduct.save();
  }

  public updateProductById = async (productId: string, updatedProduct: ProductInterface) => {
    return this.productModel.findOneAndUpdate({ _id: productId }, updatedProduct, { new: true });
  }

  public removeProductById = async (productId: string) => {
    return this.productModel.findByIdAndRemove(productId);
  }
}

export default new ProductsService();
