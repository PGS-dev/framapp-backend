import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './common/interfaces/Controller';
import errorMiddleware from './common/middleware/errorMiddleware';
import { isProdEnvironment } from './common/utils/isProdEnv';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.checkConnection();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  private connectToTheDatabase() {
    const connectionLink = isProdEnvironment ? process.env.DB_CONFIG : 'mongodb://mongo:27017/frame_app';
    mongoose.connect(connectionLink, { useNewUrlParser: true });
  }

  private checkConnection() {
    const db = mongoose.connection;
    db.on('error', () => {
      console.error.bind(console, 'connection error:');
    });

    db.once('open', async () => {
      console.log('database connected !!!');
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(process.env.APP_PREFIX || '/api', controller.router);
    });
  }
}

export default App;
