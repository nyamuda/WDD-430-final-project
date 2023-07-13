import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import * as cors from 'cors';

import {
  MessagesRouter,
  ContactsRouter,
  DocumentsRouter,
} from './server/routes/';

let app = express();

app.use(express.json());
app.use(cors());

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/second_app/')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist/second_app/index.html'));
});

//routes
app.use('/contacts', ContactsRouter);
app.use('/messages', MessagesRouter);
app.use('/documents', DocumentsRouter);

export default app;