import { Request, Response } from 'express';
import * as Joi from 'joi';
import { CompanyInfo } from 'models/CompanyInfo';

export class CompanyInfoController {
  // Create a new info
  public static async createInfo(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      title: Joi.string().required(),
      value: Joi.number().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let info = {
      title: req.body.title,

      price: req.body.value,
    };

    // Post request
    await CompanyInfo.create(info)
      .then((info) => {
        return res
          .status(201)
          .json({ message: 'The information was successfully added.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the information
  public static async getAllInfo(res: Response) {
    try {
      let info = await CompanyInfo.find({});

      return res.json(info);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Get information by ID
  public static async getInfoById(req: Request, res: Response) {
    try {
      let info = await CompanyInfo.findById(req.params.id);
      return res.json(info);
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Update info by ID
  public static async updateInfo(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      title: Joi.string().required(),
      value: Joi.number().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the info exists
    let infoExists = await CompanyInfo.findById(req.params.id);

    if (!infoExists) {
      return res.status(404).json({
        message: 'The requested information does not exist.',
      });
    }

    let info = {
      title: req.body.title,

      price: req.body.value,
    };

    // PUT request
    await CompanyInfo.updateOne({ _id: req.params.id }, info)
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

  // Delete info by ID
  public static async deleteInfo(req: Request, res: Response) {
    let infoExists = await CompanyInfo.findById(req.params.id);

    if (!infoExists) {
      return res.status(404).json({
        message: 'The requested information does not exist.',
      });
    }

    await CompanyInfo.deleteOne({ _id: req.params.id })
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
}
