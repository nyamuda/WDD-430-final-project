import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';
import { OauthUtils } from '../utils/oauthUtils';

export class OauthController {
  //Create a new Course
  public static async googleLogin(req: Request, res: Response) {
    try {
      let code = req.query.code;

      //Get Google access token
      let token = await OauthUtils.getGoogleAccessToken(code.toString());

      //Get Google user information
      let user = await OauthUtils.getGoogleUser(token);

      console.log(user);
      res.end();
    } catch (error) {
      console.log('google login failed');
      console.log(error);
    }
  }
}
