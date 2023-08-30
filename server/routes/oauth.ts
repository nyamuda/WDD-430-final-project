import * as express from 'express';
import { Request, Response } from 'express';
import { OauthController } from '../controllers';
const router = express.Router();

router.route('/google').get((req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = 'http://localhost:8000/oauth/google/callback'; // the redirect URI
  const responseType = 'code'; // the response type as "code"
  // Use full scope URLs or aliases provided by Google for profile and email
  const scope =
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'; //the scope(s) your application requires

  // Construct the authorization URL with the required parameters
  const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  res.redirect(url);
});
router.route('/google/callback').get((req: Request, res: Response) => {
  OauthController.googleLogin(req, res);
});

export { router as OauthRouter };
