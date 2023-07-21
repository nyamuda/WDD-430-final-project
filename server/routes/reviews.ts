import * as express from 'express';
import { Request, Response } from 'express';
import { ReviewsController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    ReviewsController.getReviews(res);
  })
  .post(UserUtils.ensureLoggedInMiddleware, (req: Request, res: Response) => {
    ReviewsController.createReview(req, res);
  });

router
  .route('/:id')
  .put(
    UserUtils.ensureReviewRightUserMiddleware,
    (req: Request, res: Response) => {
      ReviewsController.updateReview(req, res);
    }
  )
  .delete(
    UserUtils.ensureReviewRightUserMiddleware,
    (req: Request, res: Response) => {
      ReviewsController.deleteReview(req, res);
    }
  )
  .get(
    UserUtils.ensureReviewRightUserMiddleware,
    (req: Request, res: Response) => {
      ReviewsController.getReview(req, res);
    }
  );

export { router as ReviewRouter };
