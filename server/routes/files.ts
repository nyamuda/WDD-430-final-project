import * as express from 'express';
import { Request, Response } from 'express';
import { FilesController } from '../controllers';
import { UserUtils } from '../utils/userUtils';
import multer from 'multer';

const router = express.Router();

//Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route('/')
  .post(
    UserUtils.ensureLoggedInMiddleware,
    upload.single('file'),
    (req: Request, res: Response) => {
      FilesController.storeImage(req, res);
    }
  )
  .delete(UserUtils.ensureLoggedInMiddleware, (req: Request, res: Response) => {
    FilesController.deleteImage(req, res);
  });

export { router as FilesRouter };
