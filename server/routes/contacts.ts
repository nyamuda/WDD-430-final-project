import * as express from 'express';
import { Request, Response } from 'express';
import { ContactsController } from '../controllers';
const router = express.Router();

router
  .route('/')

  .post((req: Request, res: Response) => {
    ContactsController.emailMessage(req, res);
  });

export { router as ContactRouter };
