import { User } from '../models/';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { UserUtils } from '../utils/userUtils';
import * as nodemailer from 'nodemailer';
import { EmailUtils, verifyEmailInfo } from '../utils/emailUtils';
import * as dotenv from 'dotenv';
dotenv.config();

export class RegisterController {
  //Register user
  public static async registerUser(req: Request, res: Response) {
    let schema = Joi.object({
      name: Joi.string().required(),
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
    if (userExists) {
      return res.status(409).json({
        message:
          'Oops! It seems that an account with that email already exists. Please log in using your existing credentials.',
      });
    }

    //hash the password
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
      verified: false,
    };

    //Create user
    await User.create(newUser)
      .then(async (user) => {
        //Create token
        let userId = user._id.toString();

        //create an access token
        let accessToken = UserUtils.createAccessToken({
          email: user.email,
          isAdmin: user.isAdmin,
          userId,
          verified: user.verified,
        });

        //save the token to database
        await User.updateOne({ _id: userId }, { token: accessToken });

        //send verification email
        let emailData: verifyEmailInfo = {
          name: user.name,
          email: user.name,
          appDomain: process.env.APP_DOMAIN!,
          token: accessToken,
        };
        await this.verifyUserEmail(emailData);

        return res.status(201).json({
          message: 'The user was successfully created.',
          token: accessToken,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Send verification email on registering
  private static async verifyUserEmail(emailData: verifyEmailInfo) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
}
