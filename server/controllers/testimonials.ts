import { Request, Response } from 'express';
import * as Joi from 'joi';
import { Testimonial, User } from '../models';
import { SortOrder } from 'mongoose';

export class TestimonialsController {
  // Create a new testimonial
  public static async createTestimonial(req: Request, res: Response) {
    console.log(req.body);
    // Validation
    let schema = Joi.object({
      content: Joi.string().required(),
      userId: Joi.string().required().hex().length(24),
      position: Joi.string().required(),
      stars: Joi.number().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user with the specified ID exists
    let userExists = await User.findById(req.body.userId);

    if (!userExists) {
      return res.status(404).json({
        message: 'The user with that given ID does not exist.',
      });
    }

    let newTestimonial = {
      content: req.body.content,
      userId: req.body.userId,
      position: req.body.position,
      stars: req.body.stars ? req.body.stars : 0,
      approved: false,
    };
    // Post request
    await Testimonial.create(newTestimonial)
      .then(() => {
        //return a response
        return res
          .status(201)
          .json({ message: 'The testimonial was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the testimonials
  public static async getTestimonials(req: Request, res: Response) {
    try {
      //PAGINATION

      //items per page
      let itemsPerPage = 9;
      //current page
      let currentPage = Number(req.query.page) || 1;

      //items to skip
      let itemsToSkip = (currentPage - 1) * itemsPerPage;

      //sort by updatedAt
      //in descending order -->-1
      // let sortObject = {};
      //sortObject['updatedAt'] = -1;
      //in descending order -->-1
      let sortObject: { [key: string]: SortOrder } = { updatedAt: -1 }; // -1 for descending order

      let testimonials = await Testimonial.find({})
        .populate('userId')
        .skip(itemsToSkip)
        .limit(itemsPerPage)
        .sort(sortObject);

      //total reviews for the course
      let totalItems = await Testimonial.find({}).countDocuments();

      let meta = {
        totalItems,
        currentPage,
        pageSize: itemsPerPage,
      };

      return res.json({ testimonials, meta });
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get testimonial by ID
  public static async getTestimonial(req: Request, res: Response) {
    try {
      let testimonial = await Testimonial.findById(req.params.id).populate(
        'userId'
      );
      return res.json(testimonial);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update testimonial by ID
  public static async updateTestimonial(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      content: Joi.string().required(),
      position: Joi.string().required(),
      stars: Joi.number().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the Testimonial with the specified ID exists
    let testimonialExists = await Testimonial.findById(req.params.id);

    if (!testimonialExists) {
      return res.status(404).json({
        message: 'The testimonial with that given ID does not exist.',
      });
    }

    let testimonial = {
      content: req.body.content,
      stars: req.body.stars ? req.body.stars : 0,
      position: req.body.position,
      approved: false,
    };

    // PUT request
    await Testimonial.updateOne({ _id: req.params.id }, testimonial)
      .then(() => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Delete testimonial by ID
  public static async deleteTestimonial(req: Request, res: Response) {
    let testimonialExists = await Testimonial.findById(req.params.id);

    if (!testimonialExists) {
      return res.status(404).json({
        message: 'The requested testimonial does not exist.',
      });
    }

    await Testimonial.deleteOne({ _id: req.params.id })
      .then(() => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Approve testimonial by ID
  public static async approveTestimonial(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      approved: Joi.boolean().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the Testimonial with the specified ID exists
    let testimonialExists = await Testimonial.findById(req.params.id);

    if (!testimonialExists) {
      return res.status(404).json({
        message: 'The testimonial with that given ID does not exist.',
      });
    }

    let testimonial = {
      approved: req.body.approved,
    };

    // PUT request
    await Testimonial.updateOne({ _id: req.params.id }, testimonial)
      .then(() => {
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
