import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { PasswordController } from '../controllers';

router.route('/forgot').post((req: Request, res: Response) => {
  PasswordController.sendResetEmail(req, res);
});

router.route('/reset').post((req: Request, res: Response) => {
  PasswordController.resetPassword(req, res);
});

export { router as PasswordRouter };
