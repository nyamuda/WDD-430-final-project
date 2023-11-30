import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { UsersController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

router
  .route('/')
  .get(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    UsersController.getUsers(res);
  })
  .put((req: Request, res: Response) => {
    UsersController.changeUserVerificationStatus(req, res);
  });

router
  .route('/:id')
  .put(UserUtils.ensureRightUserMiddleware, (req: Request, res: Response) => {
    UsersController.updateUser(req, res);
  })
  .delete(
    UserUtils.ensureRightUserMiddleware,
    (req: Request, res: Response) => {
      UsersController.deleteUser(req, res);
    }
  )
  .get((req: Request, res: Response) => {
    UsersController.getUser(req, res);
  });

export { router as UserRouter };
