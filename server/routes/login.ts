import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { LoginController } from '../controllers';

router.route('/').post((req: Request, res: Response) => {
  LoginController.loginUser(req, res);
});

export { router as LoginRouter };
