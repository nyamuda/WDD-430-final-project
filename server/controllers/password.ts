import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import * as Joi from 'joi';
import * as nodemailer from 'nodemailer';
import { PasswordUtils, userInfo } from '../utils/passwordUtils';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { UserUtils } from '../utils/userUtils';
dotenv.config();

export class PasswordController {
  // Send password reset email
  public static async sendResetEmail(req: Request, res: Response) {
    try {
      //get the user by email
      let user = await User.findOne({ email: req.body.email });

      //if the user is not in the database
      if (!user) {
        return res.status(404).json({
          message:
            'Sorry, it appears that there is no user registered with the provided email address. Please verify the email or create a new account.',
        });
      }

      //if the user exits
      //send password reset email
      if (user) {
        //create and access token
        let userId = user._id.toString();
        let email = user.email;
        let isAdmin = user.isAdmin;
        let verified = user.verified;
        let name = user.name;

        let accessToken = UserUtils.createAccessToken({
          email,
          isAdmin,
          userId,
          verified,
        });

        let emailData: userInfo = {
          name,
          email,
          appDomain: process.env.APP_DOMAIN!,
          token: accessToken,
        };
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          auth: {
            user: 'ptnrlab@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: 'ptnrlab@gmail.com',
          to: emailData.email,
          subject: 'Password Reset',
          html: PasswordUtils.passwordResetHTMLTemplate(emailData),
        };

        let info = await transporter.sendMail(mailOptions);

        return res.json({
          message: 'Email was successfully sent.',
          info: info,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: error,
      });
    }
  }

  //Change user password if the provided token is valid
  public static async resetPassword(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      token: Joi.string().required(),
      userId: Joi.string().required(),
      password: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user exists
    let userExists = await User.findById(req.body.userId);

    if (!userExists) {
      return res.status(404).json({
        message: 'The requested user does not exist.',
      });
    }

    //data from the body
    let clientToken = req.body.token;
    let hashedPassword = await bcrypt.hash(req.body.password, 10); //hash the password
    let userId = req.body.userId;

    //Verify the token
    let SECRET: Secret = process.env.SECRET!;
    jwt.verify(clientToken, SECRET, async (error: any, token: any) => {
      if (error) {
        return res.status(401).json({
          message: 'Invalid or expired token',
          error: error,
        });
      }
      //if token is valid, change the password
      let newData = {
        token: clientToken,
        password: hashedPassword,
      };
      // PUT request
      await User.updateOne({ _id: userId }, newData)
        .then((user) => {
          return res.status(204).end();
        })
        .catch((err) => {
          return res.status(500).json({
            message: 'An unexpected error occurred on the server.',
            error: err,
          });
        });
    });
  }
}
