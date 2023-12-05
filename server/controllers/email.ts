import { User } from '../models/';
import { Request, Response } from 'express';

import * as Joi from 'joi';
import * as nodemailer from 'nodemailer';
import { EmailUtils, verifyEmailInfo } from '../utils/emailUtils';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
dotenv.config();

export class EmailVerificationController {
  // Send verification email
  public static async sendVerificationEmail(req: Request, res: Response) {
    try {
      //get the user by email
      let user = await User.findOne({ email: req.body.email });

      console.log(req.body);

      //if the user exits
      //send verification email
      if (user) {
        let emailData: verifyEmailInfo = {
          name: user.name,
          email: user.email,
          appDomain: process.env.APP_DOMAIN!,
          token: user.token,
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
          subject: 'Verify Your Email Address',
          html: EmailUtils.VerifyEmailHTMLTemplate(emailData),
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

  //Change user verification status if they confirm their email address
  public static async verifyUserEmail(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      token: Joi.string().required(),
      userId: Joi.string().required(),
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

    //Verify the token
    let clientToken = req.body.token;
    let SECRET: Secret = process.env.SECRET!;

    jwt.verify(clientToken, SECRET, async (error: any, token: any) => {
      if (error) {
        return res.status(401).json({
          message: 'Invalid or expired token',
          error: error,
        });
      }
      //if token is valid, mark the user as verified in the database
      // PUT request
      await User.updateOne({ _id: req.body.userId }, { verified: true })
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
