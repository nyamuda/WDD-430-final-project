import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { EmailVerificationController } from '../controllers';

router.route('/send').post((req: Request, res: Response) => {
  EmailVerificationController.sendVerificationEmail(req, res);
});

export { router as EmailVerificationRouter };
