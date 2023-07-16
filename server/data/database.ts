import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export class Database {
  private static url = `mongodb+srv://tnyamuda:${process.env['PASSWORD']}@cluster0.vpaqxqq.mongodb.net/?retryWrites=true&w=majority`;
  private static options = {
    dbName: process.env['dbName'],
  };

  //connecting to the database
  static connect = async () => {
    try {
      await mongoose.connect(this.url, this.options);
      console.log('Database connection successful.');
    } catch (error) {
      console.log('Connection to the database failed.');
      console.log(error);
    }
  };
}
