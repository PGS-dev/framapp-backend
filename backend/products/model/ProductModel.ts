import * as mongoose from 'mongoose';
import ProductInterface from '../interfaces/ProductInterface';

const Schema = mongoose.Schema;
export const productModelName = 'Product';

const productSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  imageUrl: {
    type: String,
    required: false,
  },

  price: {
    type: String,
    required: true,
  },

  promoted: {
    type: Boolean,
    required: true,
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const productModel = mongoose.model<ProductInterface & mongoose.Document>(productModelName, productSchema);

export default productModel;
