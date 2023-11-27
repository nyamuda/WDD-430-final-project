import * as express from 'express';
import { Request, Response } from 'express';
import { FAQController } from '../controllers';
import { UserUtils } from '../utils/userUtils';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    FAQController.getAllQuestions(res);
  })
  .post(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    FAQController.createQuestion(req, res);
  });

router
  .route('/:id')
  .get((req: Request, res: Response) => {
    FAQController.getQuestionById(req, res);
  })
  .put(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    FAQController.updateQuestion(req, res);
  })
  .delete(UserUtils.ensureIsAdminMiddleware, (req: Request, res: Response) => {
    FAQController.deleteQuestion(req, res);
  });

export { router as FAQRouter };
