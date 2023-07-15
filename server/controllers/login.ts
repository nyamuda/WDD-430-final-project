import { Course, Comment, User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';

export class LoginController {
  //Create a new Course
  public static async loginUser(req: Request, res: Response) {
    let schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //check to see if there user is not already in the database
    let userExists = await User.findOne({ email: req.body.email });

    //if the user is already registered
    if (!userExists) {
      return res.status(409).json({
        message:
          'Sorry, it appears that there is no user registered with the provided email address. Please verify the email or create a new account.',
      });
    }

    //compare passwords
    let passwordCorrect = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    //Password incorrect
    if (!passwordCorrect) {
      return res.status(400).json({
        message:
          'The password you entered is incorrect. Please double-check and try again.',
      });
    }

    //create and access token
    let userId = userExists._id.toString();
    let email = userExists.email;
    let isAdmin = userExists.isAdmin;

    let accessToken = UserUtils.createAccessToken({
      email,
      isAdmin,
      userId,
    });

    return res.json({
      message: 'Login successful! Welcome back.',
      token: accessToken,
    });
  }
}
