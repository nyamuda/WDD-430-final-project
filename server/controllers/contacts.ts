import { Booking } from '../models';
import { Request, Response } from 'express';
import * as Joi from 'joi';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { MessageInfo, MessageUtils } from '../utils/messageUtils';

dotenv.config();

export class ContactsController {
  //Email the message
  public static async emailMessage(req: Request, res: Response) {
    try {
      // Validation
      let schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
      }).unknown(true);

      let { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      let message: MessageInfo = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      };

      //Email service
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        auth: {
          user: 'ptnrlab@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      //email options
      const mailOptions = {
        from: 'ptnrlab@gmail.com',
        to: 'ptnmath@gmail.com',
        subject: 'Inquiry',
        html: MessageUtils.MessageHTMLTemplate(message),
      };

      //send email
      let info = await transporter.sendMail(mailOptions);

      if (info.messageId) {
        return res.json({ message: 'The message has been successfully sent.' });
      }
      throw new Error('Message submission failed.');
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: error,
      });
    }
  }
}
