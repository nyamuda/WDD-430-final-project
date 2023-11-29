import * as express from 'express';
import { Request, Response } from 'express';
import { TestimonialsController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    TestimonialsController.getTestimonials(req, res);
  })
  .post(UserUtils.ensureLoggedInMiddleware, (req: Request, res: Response) => {
    TestimonialsController.createTestimonial(req, res);
  });

router
  .route('/:id')
  .put(
    UserUtils.ensureTestimonialRightUserMiddleware,
    (req: Request, res: Response) => {
      TestimonialsController.updateTestimonial(req, res);
    }
  )
  .delete(
    UserUtils.ensureTestimonialRightUserMiddleware,
    (req: Request, res: Response) => {
      TestimonialsController.deleteTestimonial(req, res);
    }
  )
  .get((req: Request, res: Response) => {
    TestimonialsController.getTestimonial(req, res);
  });

export { router as TestimonialRouter };
