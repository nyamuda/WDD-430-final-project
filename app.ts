import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import * as cors from 'cors';

import {
  CommentRouter,
  UserRouter,
  CourseRouter,
  LoginRouter,
  RegisterRouter,
} from './server/routes/';

let app = express();

app.use(express.json());
app.use(cors());

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/final_project/')));

app.get('/', (req: Request, res: Response) => {
  res.render(path.join(__dirname, 'dist/final_project/index.html'));
});

//routes
app.use('/users', UserRouter);
app.use('/courses', CourseRouter);
app.use('/comments', CommentRouter);
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);

export default app;
