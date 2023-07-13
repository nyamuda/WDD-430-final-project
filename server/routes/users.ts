import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { UsersController } from '../controllers';

router
  .route('/')
  .get((req: Request, res: Response) => {
    UsersController.getUsers(res);
  })
  .post((req: Request, res: Response) => {
    UsersController.createUser(req, res);
  });

router
  .route('/:id')
  .put((req: Request, res: Response) => {
    UsersController.updateUser(req, res);
  })
  .delete((req: Request, res: Response) => {
    UsersController.deleteUser(req, res);
  })
  .get((req: Request, res: Response) => {
    UsersController.getUser(req, res);
  });

export { router as UserRouter };
