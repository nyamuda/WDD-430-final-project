import * as express from 'express';
import { Request, Response } from 'express';
import { CommentsController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    CommentsController.getComments(res);
  })
  .post(UserUtils.ensureLoggedInMiddleware, (req: Request, res: Response) => {
    CommentsController.createComment(req, res);
  });

router
  .route('/:id')
  .put(UserUtils.ensureRightUserMiddleware, (req: Request, res: Response) => {
    CommentsController.updateComment(req, res);
  })
  .delete(
    UserUtils.ensureRightUserMiddleware,
    (req: Request, res: Response) => {
      CommentsController.deleteComment(req, res);
    }
  )
  .get(UserUtils.ensureLoggedInMiddleware, (req: Request, res: Response) => {
    CommentsController.getComment(req, res);
  });

export { router as CommentRouter };
