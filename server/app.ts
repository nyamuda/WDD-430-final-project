import express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import cors from 'cors';

import {
  ReviewRouter,
  UserRouter,
  CourseRouter,
  LoginRouter,
  RegisterRouter,
  FilesRouter,
  GalleryRouter,
  BookingRouter,
  ContactRouter,
  OauthRouter,
} from './routes';

const app = express();

app.use(express.json());
app.use(cors());

// Serve API routes
app.use('/users', UserRouter);
app.use('/courses', CourseRouter);
app.use('/reviews', ReviewRouter);
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
app.use('/files', FilesRouter);
app.use('/gallery', GalleryRouter);
app.use('/booking', BookingRouter);
app.use('/contact', ContactRouter);
app.use('/oauth', OauthRouter);

// Serve static files from the './dist/driving-school/' directory
app.use(express.static(path.join(__dirname, './dist/driving-school/')));

// Catch-all route for Angular application
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './dist/driving-school/index.html'));
});

export default app;
