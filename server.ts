import app from './app';
import { Database } from './server/data/database';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  Database.connect();
  console.log(`Server is running on port ${PORT}.`);
});
