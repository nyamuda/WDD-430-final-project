import * as express from 'express';
import { Request, Response } from 'express';
import { GalleryController } from '../controllers';
import { UserUtils } from '../utils/userUtils';
import multer from 'multer';

const router = express.Router();

//for the image uploads
//when creating or updating the gallery
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route('/')
  .get((req: Request, res: Response) => {
    GalleryController.getItems(req, res);
  })
  .post(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    GalleryController.createItem(req, res);
  });

router
  .route('/:id')
  .delete(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    GalleryController.deleteItem(req, res);
  });

export { router as GalleryRouter };
