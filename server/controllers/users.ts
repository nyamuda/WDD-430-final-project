import { User, Comment, Course } from '../models/';

import { Request, Response } from 'express';
import * as Joi from 'joi';

export class UsersController {
  //Create a new user
  public static async createUser(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    //Post request
    User.create(user)
      .then((user) => {
        return res
          .status(201)
          .json({ message: 'The user was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  //Get all the users
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

  //Get user by ID
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

  //Update user by ID
  public static async updateUser(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
    });

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //Check if the user exists
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

    //PUT request
    User.updateOne({ _id: req.params.id }, user)
      .then((user) => {
        return res.status(204);
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  //Delete user by ID
  public static async deleteUser(req: Request, res: Response) {
    let userExists = await User.findById(req.params.id);

    if (!userExists) {
      return res.status(404).json({
        message: 'The requested user does not exist.',
      });
    }

    User.deleteOne({ _id: req.params.id })
      .then(async (user) => {
        //Delete any comments associated with that user

        //1. Get the IDs of the comments to be deleted
        let commentIds = await (
          await Comment.find({ userId: userExists._id })
        ).map((comment) => comment._id);

        //2. Delete the comments
        await Comment.deleteMany({ userId: userExists._id });

        //3. Remove the comments from the course
        await Course.updateMany(
          { comments: { $in: commentIds } },
          { $pull: { comments: { $in: commentIds } } }
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
