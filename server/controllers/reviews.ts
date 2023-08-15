import { Request, Response } from 'express';
import * as Joi from 'joi';
import { Course, Review, User } from '../models';

export class ReviewsController {
  // Create a new Review
  public static async createReview(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      content: Joi.string().required(),
      userId: Joi.string().required().hex().length(24),
      courseId: Joi.string().required().hex().length(24),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user and course with the specified ID exists
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

    let newReview = {
      content: req.body.content,
      userId: req.body.userId,
      courseId: req.body.courseId,
      stars: req.body.stars ? req.body.stars : 0,
    };
    // Post request
    await Review.create(newReview)
      .then(async (review) => {
        // Add the review ID to the course
        await Course.updateOne(
          { _id: review.courseId },
          { $push: { reviews: review._id } }
        );

        //update the course rating
        await this.updateCourseRating(newReview.courseId);

        //return a response
        return res
          .status(201)
          .json({ message: 'The review was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the Reviews
  public static async getReviews(res: Response) {
    try {
      let reviews = await Review.find().populate('userId');
      return res.json(reviews);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  

  // Get Review by ID
  public static async getReview(req: Request, res: Response) {
    try {
      let review = await Review.findById(req.params.id);
      return res.json(review);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update Review by ID
  public static async updateReview(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      content: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the review with the specified ID exists
    let reviewExists = await Review.findById(req.params.id);

    if (!reviewExists) {
      return res.status(404).json({
        message: 'The review with that given ID does not exist.',
      });
    }

    let review = {
      content: req.body.content,
      stars: req.body.stars ? req.body.stars : 0,
    };

    // PUT request
    await Review.updateOne({ _id: req.params.id }, review)
      .then(async (review) => {
        //update the course rating
        await this.updateCourseRating(req.body.courseId);

        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Delete Review by ID
  public static async deleteReview(req: Request, res: Response) {
    let reviewExists = await Review.findById(req.params.id);

    if (!reviewExists) {
      return res.status(404).json({
        message: 'The requested review does not exist.',
      });
    }

    await Review.deleteOne({ _id: req.params.id })
      .then(async (review) => {
        // Remove the review ID from the course
        await Course.findOneAndUpdate(
          { _id: reviewExists.courseId },
          { $pull: { reviews: reviewExists._id } }
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

  //Update the rating of a course
  //if a new review is added
  private static async updateCourseRating(courseId: string) {
    try {
      //get all reviews the course
      let reviews = await Review.find({ courseId: courseId });

      //calculate the total stars for the course
      let totalStars: number = reviews.reduce((acc, next) => {
        return acc + next.stars;
      }, 0);
      //calculate the new rating
      //and round to 1 d.p
      let newRating: number =
        Math.round((totalStars / reviews.length) * 10) / 10;

      //update the course rating
      await Course.findByIdAndUpdate(courseId, { rating: newRating });
    } catch (error) {
      console.log('Error updating course rating');
    }
  }
}
