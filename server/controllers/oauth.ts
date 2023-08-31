import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';
import { GoogleOauthUtils } from '../utils/googleOauthUtils';
import { FacebookOauthUtils } from '../utils/facebookOauthUtils';

export class OauthController {
  //Login Google User
  public static async googleLogin(req: Request, res: Response) {
    try {
      let code = req.query.code;

      //Get Google access token
      let token = await GoogleOauthUtils.getGoogleAccessToken(code.toString());

      //Get Google user information
      let { name, email, picture } = await GoogleOauthUtils.getGoogleUser(
        token
      );

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

  //Login Facebook User
  public static async facebookLogin(req: Request, res: Response) {
    try {
      let code = req.query.code;

      //Get Google access token
      let token = await FacebookOauthUtils.getFacebookAccessToken(
        code.toString()
      );

      //Get Google user information
      let data = await FacebookOauthUtils.getFacebookUser(token);

      let name = data['name'];
      let email = data['email'];
      let imageUrl = data['picture']['data']['url'];

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
      User.create({ name, email, imageUrl })
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
