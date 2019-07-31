import * as mongoose from 'mongoose';
import CategoryInterface from '../interfaces/CategoryInterface';

const Schema = mongoose.Schema;
export const categoryModelName = 'Category';

export const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: false,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const categoryModel = mongoose.model<CategoryInterface & mongoose.Document>(categoryModelName, categorySchema);

export default categoryModel;
