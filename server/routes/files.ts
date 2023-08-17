import * as express from 'express';
import { Request, Response } from 'express';
import { FilesController } from '../controllers';
import { UserUtils } from '../utils/userUtils';
import * as multer from 'multer';

const router = express.Router();

//fore the image uploads
//when creating or updating a course
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/').get((req: Request, res: Response) => {});

router
  .route('/course')
  .post(
    UserUtils.ensureIsAdminMiddleware,
    upload.single('file'),
    (req: Request, res: Response) => {
      FilesController.storeCourseImage(req, res);
    }
  );

export { router as FilesRouter };
