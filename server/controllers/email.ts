import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';
import * as nodemailer from 'nodemailer';
import { EmailUtils, verifyEmailInfo } from '../utils/emailUtils';
import * as dotenv from 'dotenv';
dotenv.config();

export class EmailVerificationController {
  // Send verification email
  public static async sendVerificationEmail(req: Request, res: Response) {
    try {
      //get the user by email
      let user = await User.findOne({ email: req.body.email });

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
          subject: 'Verify your email address',
          html: EmailUtils.VerifyEmailHTMLTemplate(emailData),
        };

        let info = await transporter.sendMail(mailOptions);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: error,
      });
    }
  }
}
