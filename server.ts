import app from './app';

const port = 8000;

// Define your routes and middleware here

app.listen(port, () => {
  //   Database.connect();
  console.log(`Server is running on port ${port}.`);
});
