import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { RegisterController } from '../controllers';

router.route('/').post((req: Request, res: Response) => {
  RegisterController.registerUser(req, res);
});

export { router as RegisterRouter };
