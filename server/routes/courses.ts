import * as express from 'express';
import { Request, Response } from 'express';
import { CoursesController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

import Joi from 'joi';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    CoursesController.getCourses(res);
  })
  .post(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CoursesController.createCourse(req, res);
  });

router
  .route('/:id')
  .put(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CoursesController.updateCourse(req, res);
  })
  .delete(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CoursesController.deleteCourse(req, res);
  })
  .get((req: Request, res: Response) => {
    CoursesController.getCourse(req, res);
  });

router.route('/:id/reviews').get((req: Request, res: Response) => {
  CoursesController.getCourseReviews(req, res);
});

export { router as CourseRouter };
