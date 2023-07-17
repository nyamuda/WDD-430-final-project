import { User, Review, Course } from '../models/';
import { Request, Response } from 'express';
import * as Joi from 'joi';

export class UsersController {
  // Get all the users
  public static async getUsers(res: Response) {
    try {
      let users = await User.find({});
      return res.json(users);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get user by ID
  public static async getUser(req: Request, res: Response) {
    try {
      let user = await User.findById(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update user by ID
  public static async updateUser(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user exists
    let userExists = await User.findById(req.params.id);
    console.log(req.params.id);

    if (!userExists) {
      return res.status(404).json({
        message: 'The requested user does not exist.',
      });
    }

    let user = {
      name: req.body.name,
      email: req.body.email,
    };

    // PUT request
    await User.updateOne({ _id: req.params.id }, user)
      .then((user) => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Delete user by ID
  public static async deleteUser(req: Request, res: Response) {
    let userExists = await User.findById(req.params.id);

    if (!userExists) {
      return res.status(404).json({
        message: 'The requested user does not exist.',
      });
    }

    await User.deleteOne({ _id: req.params.id })
      .then(async (user) => {
        // Delete any reviews associated with that user

        // 1. Get the IDs of the reviews to be deleted
        let reviewIds = (await Review.find({ userId: userExists._id })).map(
          (review) => review._id
        );

        // 2. Delete the reviews
        await Review.deleteMany({ userId: userExists._id });

        // 3. Remove the reviews from the course
        await Course.updateMany(
          { reviews: { $in: reviewIds } },
          { $pull: { reviews: { $in: reviewIds } } }
        );

        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }
}
