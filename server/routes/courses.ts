import * as express from 'express';
import { Request, Response } from 'express';
import { CoursesController } from '../controllers';

import Joi from 'joi';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    CoursesController.getCourses(res);
  })
  .post((req: Request, res: Response) => {
    CoursesController.createCourse(req, res);
  });

router
  .route('/:id')
  .put((req: Request, res: Response) => {
    CoursesController.updateCourse(req, res);
  })
  .delete((req: Request, res: Response) => {
    CoursesController.deleteCourse(req, res);
  })
  .get((req: Request, res: Response) => {
    CoursesController.getCourse(req, res);
  });

export { router as CourseRouter };
