import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import { UsersController } from '../controllers';

router.route('/').post((req: Request, res: Response) => {});

export { router as RegisterRouter };
