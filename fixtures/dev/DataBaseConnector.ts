import * as mongoose from 'mongoose';

class DataBaseConnector {

  public connect() {
    if (mongoose.connection.readyState) {
      return mongoose.connection;
    }
    mongoose.connect('mongodb://0.0.0.0:27017/frame_app', { useNewUrlParser: true });
  }

  public checkConnection() {
    const db = mongoose.connection;

    db.on('error', () => {
      console.error.bind(console, 'connection error:');
    });

    db.once('open', async () => {
      console.log('database connected !!!');
    });
  }

  public closeConnection() {
    setTimeout(() => {
      mongoose.connection.close().then(() => {
        console.log('connection closed');
      });
    },         500);
  }
}

export default new DataBaseConnector();
