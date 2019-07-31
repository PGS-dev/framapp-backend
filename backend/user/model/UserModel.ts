import * as mongoose from 'mongoose';
import UserInterface from '../interfaces/UserInteface';

const Schema = mongoose.Schema;
export const userModelName = 'User';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

const userModel = mongoose.model<UserInterface & mongoose.Document>(userModelName, userSchema);

export default userModel;
