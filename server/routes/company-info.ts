import * as express from 'express';
import { Request, Response } from 'express';
import { CompanyInfoController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    CompanyInfoController.getAllInfo(res);
  })
  .post(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CompanyInfoController.createInfo(req, res);
  });

router
  .route('/:id')
  .get((req: Request, res: Response) => {
    CompanyInfoController.getInfoById(req, res);
  })
  .put(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CompanyInfoController.updateInfo(req, res);
  })
  .delete(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    CompanyInfoController.deleteInfo(req, res);
  });

export { router as CompanyInfoRouter };
