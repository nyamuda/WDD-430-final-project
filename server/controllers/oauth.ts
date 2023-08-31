import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';
import { OauthUtils } from '../utils/oauthUtils';

export class OauthController {
  //Login Google User
  public static async googleLogin(req: Request, res: Response) {
    try {
      let code = req.query.code;

      //Get Google access token
      let token = await OauthUtils.getGoogleAccessToken(code.toString());

      //Get Google user information
      let { name, email, picture } = await OauthUtils.getGoogleUser(token);

      //check if the user already exists in the database
      let userExists = await User.findOne({ email: email });

      //if already user exists
      ///create a JWT token
      if (userExists) {
        //create an access token
        let accessToken = UserUtils.createAccessToken({
          email: userExists.email,
          isAdmin: userExists.isAdmin,
          userId: userExists._id.toString(),
        });
        return res.status(201).json({
          message: 'Login successful.',
          token: accessToken,
        });
      }

      //else add the new user to the database
      //and then return a JWT token
      User.create({ name: name, email: email, imageUrl: picture })
        .then((user) => {
          //create an access token
          let accessToken = UserUtils.createAccessToken({
            email: user.email,
            isAdmin: user.isAdmin,
            userId: user.toObject()._id.toString(),
          });
          return res.json({
            message: 'Login successful.',
            token: accessToken,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: err,
            message: 'An unexpected error occurred on the server.',
          });
        });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'An unexpected error occurred on the server.',
      });
    }
  }
}
