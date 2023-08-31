import * as express from 'express';
import { Request, Response } from 'express';
import { OauthController } from '../controllers';
import { OauthUtils } from '../utils/oauthUtils';
const router = express.Router();

router.route('/url').get((req: Request, res: Response) => {
  return res.json({ googleUrl: OauthUtils.getGoogleUrl() });
});
router.route('/google/callback').get((req: Request, res: Response) => {
  OauthController.googleLogin(req, res);
});

export { router as OauthRouter };
