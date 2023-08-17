import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export class FilesController {
  public static async storeCourseImage(req: Request, res: Response) {
    try {
      const privatekey = require('firebasePrivateKey.json');

      admin.initializeApp({
        credential: admin.credential.cert(privatekey),
        storageBucket: 'drivingschool-7c02e.appspot.com', // Without "gs://"
      });

      const storageBucket = admin.storage().bucket();

      const file = req.body.file;

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
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
      });

      blobStream.on('finish', async () => {
        // Get the download URL of the uploaded file
        try {
          const downloadURL = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '', // Set an expiration date for the URL
          });

          res.status(200).json({ downloadURL: downloadURL[0] });
        } catch (error) {
          console.error('Error getting download URL:', error);
          res.status(500).json({ error: 'No image' });
        }
      });

      blobStream.end(file.buffer);
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      res.status(500).json({ error: 'Error initializing Firebase' });
    }
  }
}
