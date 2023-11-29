import { Request, Response } from 'express';
import * as Joi from 'joi';
import { Testimonial, User } from '../models';

export class TestimonialsController {
  // Create a new testimonial
  public static async createTestimonial(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      content: Joi.string().required(),
      userId: Joi.string().required().hex().length(24),
      position: Joi.string().required(),
      stars: Joi.number().required,
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
  public static async getTestimonials(res: Response) {
    try {
      let testimonials = await Testimonial.find({}).populate('userId');
      return res.json(testimonials);
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
      stars: Joi.number().required,
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
}
