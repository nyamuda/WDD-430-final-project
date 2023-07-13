import * as express from 'express';
import { Request, Response } from 'express';
import { CommentsController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    CommentsController.getComments(res);
  })
  .post((req: Request, res: Response) => {
    CommentsController.createComment(req, res);
  });

router
  .route('/:id')
  .put((req: Request, res: Response) => {
    CommentsController.updateComment(req, res);
  })
  .delete((req: Request, res: Response) => {
    CommentsController.deleteComment(req, res);
  })
  .get((req: Request, res: Response) => {
    CommentsController.getComment(req, res);
  });

export { router as CommentRouter };
