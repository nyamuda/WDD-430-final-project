import * as express from 'express';
import { Request, Response } from 'express';
import { BookingsController } from '../controllers';
const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    BookingsController.getBookings(req, res);
  })
  .post((req: Request, res: Response) => {
    BookingsController.createBooking(req, res);
  });

router
  .route('/:id')

  .delete((req: Request, res: Response) => {
    BookingsController.deleteBooking(req, res);
  })
  .get((req: Request, res: Response) => {
    BookingsController.getBooking(req, res);
  });

export { router as BookingRouter };
