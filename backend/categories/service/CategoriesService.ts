import CategoryModel from '../model/CategoryModel';
import CategoryInterface from '../interfaces/CategoryInterface';

class CategoriesService {

  private categoryModel = CategoryModel;

  public getCategories = async () => {
    return this.categoryModel.find().select('title description categoryId');
  }

  public getCategoryById = async (categoryId: string) => {
    return this.categoryModel.findById(categoryId).
        populate({ path: 'products', select: 'title description' }).
        exec();
  }

  public createCategory = async (categoryObject: CategoryInterface) => {
    const category = new CategoryModel({
      userId: categoryObject.userId,
      description: categoryObject.title,
      title: categoryObject.description,
    });
    return category.save();
  }

  public updateCategoryById = async (
      categoryId: string, categoryProps: any) => {
    return this.categoryModel.findOneAndUpdate({ _id: categoryId }, categoryProps, { new: true });
  }

  public removeCategoryById = async (categoryId: string) => {
    return this.categoryModel.findByIdAndRemove(categoryId);
  }

  public addProductIdToCategory = async (
      categoryId: string, productId: string) => {
    return this.categoryModel.update({ _id: categoryId }, { $push: { products: productId } });
  }

  public removeProductIdFromCategory = async (
      categoryId: string, productId: string) => {
    return this.categoryModel.update({ _id: categoryId }, { $pull: { products: productId } });
  }

}

export default new CategoriesService();
