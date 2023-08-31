import * as express from 'express';
import { Request, Response } from 'express';
import { OauthController } from '../controllers';
import { GoogleOauthUtils } from '../utils/googleOauthUtils';
import { FacebookOauthUtils } from '../utils/facebookOauthUtils';
const router = express.Router();

router.route('/url').get((req: Request, res: Response) => {
  return res.json({
    googleUrl: GoogleOauthUtils.getGoogleUrl(),
    facebookUrl: FacebookOauthUtils.getFacebookUrl(),
  });
});
router.route('/google/callback').get((req: Request, res: Response) => {
  OauthController.googleLogin(req, res);
});

router.route('/facebook/callback').get((req: Request, res: Response) => {
  OauthController.facebookLogin(req, res);
});

export { router as OauthRouter };
