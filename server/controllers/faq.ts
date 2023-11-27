import { Request, Response } from 'express';
import * as Joi from 'joi';
import { FAQ } from '../models/FAQ';

export class FAQController {
  // Create a new info
  public static async createQuestion(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let question = {
      question: req.body.question,

      answer: req.body.answer,
    };

    // Post request
    await FAQ.create(question)
      .then((question) => {
        return res
          .status(201)
          .json({ message: 'The question was successfully added.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the questions
  public static async getAllQuestions(res: Response) {
    try {
      let questions = await FAQ.find({});

      return res.json(questions);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get question by ID
  public static async getQuestionById(req: Request, res: Response) {
    try {
      let question = await FAQ.findById(req.params.id);
      return res.json(question);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update question by ID
  public static async updateQuestion(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the question exists
    let questionExists = await FAQ.findById(req.params.id);

    if (!questionExists) {
      return res.status(404).json({
        message: 'The requested question does not exist.',
      });
    }

    let question = {
      question: req.body.question,

      answer: req.body.answer,
    };

    // PUT request
    await FAQ.updateOne({ _id: req.params.id }, question)
      .then((info) => {
        return res.status(204).end();
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Delete question by ID
  public static async deleteQuestion(req: Request, res: Response) {
    let questionExists = await FAQ.findById(req.params.id);

    if (!questionExists) {
      return res.status(404).json({
        message: 'The requested question does not exist.',
      });
    }

    await FAQ.deleteOne({ _id: req.params.id })
      .then((question) => {
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
