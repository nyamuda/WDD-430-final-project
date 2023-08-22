import { Course, Review } from '../models/';
import { Request, Response } from 'express';
import * as Joi from 'joi';

export class CoursesController {
  // Create a new Course
  public static async createCourse(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      title: Joi.string().required(),
      shortDescription: Joi.string().required(),
      fullDescription: Joi.string().required(),
      price: Joi.number().required(),
      imageUrl: Joi.optional(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let course = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    // Post request
    await Course.create(course)
      .then((course) => {
        return res
          .status(201)
          .json({ message: 'The course was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the Courses
  public static async getCourses(req: Request, res: Response) {
    try {
      //Get the query parameter for sorting
      let sortBy = req.query.sort ? req.query.sort.toString() : 'rating';

      let sortObject = {};
      sortObject[sortBy] = -1;

      let courses = await Course.find({})
        .populate({
          path: 'reviews',
          populate: {
            path: 'userId',
          },
        })
        .sort(sortObject);
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get Course by ID
  public static async getCourse(req: Request, res: Response) {
    try {
      let course = await Course.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
          path: 'userId',
        },
      });
      return res.json(course);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get all the Reviews for a given course
  public static async getCourseReviews(req: Request, res: Response) {
    try {
      //PAGINATION

      //items per page
      let itemsPerPage = 5;
      //current page
      let currentPage = Number(req.query.page) || 1;

      //reviews to skip
      let itemsToSkip = (currentPage - 1) * itemsPerPage;

      let reviews = await Review.find({ courseId: req.params.id })
        .skip(itemsToSkip)
        .limit(itemsPerPage)
        .populate('userId');

      //total reviews for the course
      let totalItems = await Review.find({
        courseId: req.params.id,
      }).countDocuments();

      let meta = {
        totalItems,
        currentPage,
        pageSize: itemsPerPage,
      };

      return res.json({ reviews, meta });
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update Course by ID
  public static async updateCourse(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      title: Joi.string().optional(),
      shortDescription: Joi.string().optional(),
      fullDescription: Joi.string().optional(),
      price: Joi.number().optional(),
      imageUrl: Joi.optional(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the Course exists
    let courseExists = await Course.findById(req.params.id);

    if (!courseExists) {
      return res.status(404).json({
        message: 'The requested course does not exist.',
      });
    }

    let course = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    // PUT request
    await Course.updateOne({ _id: req.params.id }, course)
      .then((course) => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Delete Course by ID
  public static async deleteCourse(req: Request, res: Response) {
    let courseExists = await Course.findById(req.params.id);

    if (!courseExists) {
      return res.status(404).json({
        message: 'The requested course does not exist.',
      });
    }

    await Course.deleteOne({ _id: req.params.id })
      .then(async (course) => {
        // Delete any reviews associated with that course
        await Review.deleteMany({ courseId: courseExists._id });
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }
  // Search for courses by name

  public static async searchCourses(req: Request, res: Response) {
    try {
      let searchName = req.query.title;

      let courses = await Course.find({
        title: { $regex: searchName, $options: 'i' },
      });

      return res.json(courses);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }
}
