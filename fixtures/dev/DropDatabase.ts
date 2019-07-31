import * as mongoose from 'mongoose';
import DataBaseConnector from './DataBaseConnector';

class DropDatabase {

  private dataBaseConnector = DataBaseConnector;

  public init = async () => {
    this.dataBaseConnector.connect();
    this.dataBaseConnector.checkConnection();

    await this.cleanDatabase();
    this.dataBaseConnector.closeConnection();
  }

  private async cleanDatabase() {
    return mongoose.connection.dropDatabase().then(() => {
      console.log('db dropped');
    });
  }
}

export default new DropDatabase().init();
