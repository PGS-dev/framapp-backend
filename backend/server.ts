import 'dotenv/config';
import App from './App';
import LoginController from './auth/controller/LoginController';
import RegisterController from './auth/controller/RegisterController';
import CategoriesController from './categories/controller/CategoriesController';
import UserController from './user/controller/UserController';
import ProductsController from './products/controller/ProductsController';

const controllersCollection = [
  new UserController(),
  new LoginController(),
  new RegisterController(),
  new CategoriesController(),
  new ProductsController(),
];

const app = new App(controllersCollection);

app.listen();
