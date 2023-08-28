import mongoose, { Schema, model } from 'mongoose';

interface IBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  service: string;
}

let bookingSchema = new Schema<IBooking>(
  {
    name: String,
    email: String,
    phone: String,

    date: String,
    time: String,
    address: String,
    service: String,
  },
  {
    timestamps: true,
  }
);

let Booking = model<IBooking>('Booking', bookingSchema, 'bookings');

export { Booking };
