import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {});

router
  .route('/:id')
  .delete((req: Request, res: Response) => {})
  .get((req: Request, res: Response) => {});

export { router as UserRouter };
