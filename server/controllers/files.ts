import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export class FilesController {
  //Store course image to Firebase
  //Return --- the image URL
  public static async storeImage(req: Request, res: Response) {
    try {
      const privatekey = require('../../firebasePrivateKey');

      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert(privatekey),
          storageBucket: 'drivingschool-7c02e.appspot.com', // Without "gs://"
        });
      }

      const storageBucket = admin.storage().bucket();

      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const fileName = Date.now() + '-' + file.originalname;
      const fileUpload = storageBucket.file(fileName);
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (error) => {
        console.error('Error uploading file');
        res.status(500).json({ error: 'Error uploading file' });
      });

      blobStream.on('finish', async () => {
        // Get the download URL of the uploaded file
        try {
          const expires = new Date('9999-12-31T23:59:59.999Z'); // Set to a distant future date
          const downloadURL = await fileUpload.getSignedUrl({
            action: 'read',
            expires: expires.toISOString(),
          });

          res.status(200).json({ downloadURL: downloadURL[0] });
        } catch (error) {
          console.error('Error getting download URL');
          res.status(500).json({ error: 'No image' });
        }
      });

      blobStream.end(file.buffer);
    } catch (error) {
      console.error('Error initializing Firebase');
      res.status(500).json({ error: 'Error initializing Firebase' });
    }
  }

  public static deleteImage(req: Request, res: Response) {
    try {
      let imageUrl = req.body['imageUrl'];
      const privatekey = require('../../firebasePrivateKey');

      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert(privatekey),
          storageBucket: 'drivingschool-7c02e.appspot.com', // Without "gs://"
        });
      }

      // Extract the path from the URL
      const url = new URL(imageUrl);
      const pathName = url.pathname;

      // Split the path to get the filename
      const parts = pathName.split('/');
      const filename = parts[parts.length - 1];

      const storageBucket = admin.storage().bucket();

      //the file to delete
      let file = storageBucket.file(filename);

      // Delete the file
      file
        .delete()
        .then(() => {
          console.log('Image deleted successfully');
          res.status(200).json({ message: 'Image deleted successfully' });
        })
        .catch((error) => {
          console.error('Error deleting image');
          return res.status(500).json({ error: 'Error deleting image' });
        });
    } catch (error) {
      console.error('Error deleting image');
      return res.status(500).json({ error: 'Error deleting image' });
    }
  }
}
