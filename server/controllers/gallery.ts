import { Request, Response } from 'express';
import * as Joi from 'joi';
import { Gallery } from '../models';

export class GalleryController {
  // Create a new Gallery Item
  public static async createItem(req: Request, res: Response) {
    // Validation
    let schema = Joi.object({
      url: Joi.string().required(),
      type: Joi.string().required(),
    }).unknown(true);

    let { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let item = {
      url: req.body.url,
      type: req.body.type,
    };

    // Post request
    await Gallery.create(item)
      .then((item) => {
        return res
          .status(201)
          .json({ message: 'The item was successfully created.' });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'An unexpected error occurred on the server.',
          error: err,
        });
      });
  }

  // Get all the Gallery Items
  public static async getItems(req: Request, res: Response) {
    try {
      //PAGINATION
      //items per page
      let itemsPerPage = 9;
      //current page
      let currentPage = Number(req.query.page) || 1;

      //reviews to skip
      let itemsToSkip = (currentPage - 1) * itemsPerPage;

      //Get the query parameter for sorting
      let sortBy = req.query.sort ? req.query.sort.toString() : 'updatedAt';

      let sortObject = {};
      //in descending order -->-1
      sortObject[sortBy] = -1;

      let items = await Gallery.find({})
        .skip(itemsToSkip)
        .limit(itemsPerPage)
        .sort(sortObject);

      //total items
      let totalItems = await Gallery.find({}).countDocuments();

      let meta = {
        totalItems,
        currentPage,
        pageSize: itemsPerPage,
      };

      return res.json({ items, meta });
    } catch (err) {
      return res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err,
      });
    }
  }

  // Delete Gallery Item by ID
  public static async deleteItem(req: Request, res: Response) {
    let itemExists = await Gallery.findById(req.params.id);

    if (!itemExists) {
      return res.status(404).json({
        message: 'The requested item does not exist.',
      });
    }

    await Gallery.deleteOne({ _id: req.params.id })
      .then((response) => {
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
