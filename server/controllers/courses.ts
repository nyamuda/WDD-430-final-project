import { Course, Comment } from '../models/';
import { Request, Response } from 'express';
import * as Joi from 'joi';

export class CoursesController {
  //Create a new Course
  public static async createCourse(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      imageUrl: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let course = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    //Post request
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

  //Get all the Courses
  public static async getCourses(res: Response) {
    try {
      let courses = await Course.find({}).populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      });
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  //Get Course by ID
  public static async getCourse(req: Request, res: Response) {
    try {
      let course = await Course.findById(req.params.id).populate({
        path: 'comments',
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

  //Get comments for a particular course
  //Get Course by ID
  public static async getCourseComments(req: Request, res: Response) {
    try {
      let course = await Course.findById(req.params.id)
        .select('comments')
        .populate({
          path: 'comments',
          populate: {
            path: 'userId',
          },
        });
      return res.json(course.comments);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  //Update Course by ID
  public static async updateCourse(req: Request, res: Response) {
    //Validation
    let schema = Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      price: Joi.number().optional(),
      imageUrl: Joi.string().optional(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    //Check if the Course exists
    let courseExists = await Course.findById(req.params.id);

    if (!courseExists) {
      return res.status(404).json({
        message: 'The requested course does not exist.',
      });
    }

    let course = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    //PUT request
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

  //Delete Course by ID
  public static async deleteCourse(req: Request, res: Response) {
    let courseExists = await Course.findById(req.params.id);

    if (!courseExists) {
      return res.status(404).json({
        message: 'The requested course does not exist.',
      });
    }

    await Course.deleteOne({ _id: req.params.id })
      .then(async (course) => {
        //Delete any comments associated with that course
        await Comment.deleteMany({ courseId: courseExists._id });
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
