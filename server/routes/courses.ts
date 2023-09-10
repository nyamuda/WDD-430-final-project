import * as express from 'express';
import { Request, Response } from 'express';
import { CoursesController } from '../controllers';
import { UserUtils } from '../utils/userUtils';
import multer from 'multer';

const router = express.Router();

//fore the image uploads
//when creating or updating a course
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route('/')
  .get((req: Request, res: Response) => {
    CoursesController.getCourses(req, res);
  })
  .post(
    UserUtils.ensureIsAdminMiddleware,
    upload.single('file'),
    (req: Request, res: Response) => {
      CoursesController.createCourse(req, res);
    }
  );

router.route('/search').get((req: Request, res: Response) => {
  CoursesController.searchCourses(req, res);
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
