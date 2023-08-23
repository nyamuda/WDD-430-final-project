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
    let userId = req.params['id'];
    // Validation
    let schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      imageUrl: Joi.optional(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //check to see if there is no user already in the database with the new updated email
    let updatedEmail = req.body['email'];
    if (updatedEmail) {
      let doesUserWithEmailExist: boolean = await this.doesUserWithEmailExist(
        userId,
        updatedEmail
      );
      //if the user with that email exists
      if (doesUserWithEmailExist) {
        return res.status(400).json({
          error:
            'The email you entered is already taken by another user. Please choose a different email address.',
        });
      }
    }
    // Check if the user exists
    let userExists = await User.findById(req.params.id);

    if (!userExists) {
      return res.status(404).json({
        message: 'The requested user does not exist.',
      });
    }

    let user = {
      name: req.body.name,
      email: req.body.email,
      imageUrl: req.body.imageUrl,
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

  //check to see if there is no user already in the database with the new updated email
  private static async doesUserWithEmailExist(
    currentUserId: string,
    updatedEmail: string
  ): Promise<boolean> {
    let userExists = await User.findOne({ email: updatedEmail });

    //if the user is already registered
    if (
      userExists['_id'].toString() != currentUserId &&
      userExists['email'] == updatedEmail
    ) {
      return true;
    }

    return false;
  }
}
