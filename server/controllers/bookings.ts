import { Booking } from '../models/';
import { Request, Response } from 'express';
import * as Joi from 'joi';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

export class BookingsController {
  // Create a new Booking
  public static async createBooking(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      date: Joi.string().required(),
      time: Joi.string().required(),
      address: Joi.string().required(),
      service: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let booking: BookInfo = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      address: req.body.address,
      service: req.body.service,
    };

    // Post request
    await Booking.create(booking)
      .then(async (response) => {
        //email the booking
        await this.emailBooking(booking);

        return res
          .status(201)
          .json({ message: 'The booking was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the Bookings
  public static async getBookings(req: Request, res: Response) {
    try {
      //Get the query parameter for sorting

      let sortBy = req.query.sort ? req.query.sort.toString() : 'dateCreated';

      let sortObject = {};
      //in descending order -->-1
      sortObject[sortBy] = -1;

      let bookings = await Booking.find({}).sort(sortObject);
      return res.json(bookings);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get Booking by ID
  public static async getBooking(req: Request, res: Response) {
    try {
      let booking = await Booking.findById(req.params.id);
      return res.json(booking);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Delete Booking by ID
  public static async deleteBooking(req: Request, res: Response) {
    let bookingExists = await Booking.findById(req.params.id);

    if (!bookingExists) {
      return res.status(404).json({
        message: 'The requested booking does not exist.',
      });
    }

    await Booking.deleteOne({ _id: req.params.id })
      .then(async (response) => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  //Email the booking
  private static async emailBooking(booking: BookInfo) {
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
        from: booking.email,
        to: 'ptnrlab@gmail.com',
        subject: 'Booking Confirmation',
        text: `<h1>New booking:</h1>
       <p> ${booking.name}</p>
       <p> ${booking.phone}</p>
       <p> ${booking.date}</p>
       <p> ${booking.time}</p>
       <p> ${booking.address}</p>
       <p> ${booking.service}</p>
        `,
      };

      let info = await transporter.sendMail(mailOptions);

      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}

interface BookInfo {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  service: string;
}
