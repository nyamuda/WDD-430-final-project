import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';

export class LoginController {
  //Login user
  public static async loginUser(req: Request, res: Response) {
    let schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //check to see if the use is in the database
    let userExists = await User.findOne({ email: req.body.email });

    //if the user is not in the database
    if (!userExists) {
      return res.status(404).json({
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

  //Login Admin
  public static async loginAdmin(req: Request, res: Response) {
    let schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //check to see if the use is in the database
    let userExists = await User.findOne({ email: req.body.email });

    //if the user is not in the database
    if (!userExists) {
      return res.status(404).json({
        message: 'Invalid credentials. Verify your email.',
      });
    }

    //check if the user is an admin
    if (!userExists.isAdmin) {
      return res.status(400).json({
        message: 'Invalid credentials. Verify your email.',
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
