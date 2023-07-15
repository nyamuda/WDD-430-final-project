import { Request, Response } from 'express';
import * as Joi from 'joi';
import { Course, Comment, User } from '../models/';

export class CommentsController {
  //Create a new Comment
  public static async createComment(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      content: Joi.string().required(),
      userId: Joi.string().required().hex().length(24),
      courseId: Joi.string().required().hex().length(24),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //Check if the user and course with the specified ID exists
    let userExists = await User.findById(req.body.userId);
    let courseExists = await Course.findById(req.body.courseId);

    if (!userExists) {
      return res.status(404).json({
        message: 'The user with that given ID does not exist.',
      });
    }
    if (!courseExists) {
      return res.status(404).json({
        message: 'The course with that given ID does not exist.',
      });
    }

    let newComment = {
      content: req.body.content,
      userId: req.body.userId,
      courseId: req.body.courseId,
    };
    //Post request
    Comment.create(newComment)
      .then(async (comment) => {
        //add the comment ID to the course
        await Course.updateOne(
          { _id: comment.courseId },
          { $push: { comments: comment._id } }
        );
        return res
          .status(201)
          .json({ message: 'The comment was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  //Get all the Comments
  public static async getComments(res: Response) {
    try {
      let comments = await Comment.find({});
      return res.json(comments);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  //Get Comment by ID
  public static async getComment(req: Request, res: Response) {
    try {
      let comment = await Comment.findById(req.params.id);

      return res.json(comment);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  //Update Comment by ID
  public static async updateComment(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      content: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //Check if the comment with the specified ID exists
    let commentExists = await Comment.findById(req.params.id);

    if (!commentExists) {
      return res.status(404).json({
        message: 'The comment with that given ID does not exist.',
      });
    }

    let comment = {
      content: req.body.name,
    };

    //PUT request
    Comment.updateOne({ _id: req.params.id }, comment)
      .then((comment) => {
        return res.status(204);
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  //Delete Comment by ID
  public static async deleteComment(req: Request, res: Response) {
    let commentExists = await Comment.findById(req.params.id);

    if (!commentExists) {
      return res.status(404).json({
        message: 'The requested comment does not exist.',
      });
    }

    Comment.deleteOne({ _id: req.params.id })
      .then(async (comment) => {
        //Remove the comment ID from the course
        await Course.findOneAndUpdate(
          { _id: commentExists.courseId },
          { $pull: { comments: commentExists._id } }
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
