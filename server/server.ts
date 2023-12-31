import app from './app';
import { Database } from './data/database';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Database.connect();
  console.log(`Server is running on port ${PORT}.`);
});
