import { JwtPayload, Secret, JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { Review } from '../models';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export class GoogleOauthUtils {
  //Get the Google access token using the code
  public static async getGoogleAccessToken(code: string): Promise<string> {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = process.env.GOOGLE_RETURN_URL; // the redirect URI
      const grantType = 'authorization_code'; // the grant type for code exchange

      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
            grant_type: grantType,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        return response.data.access_token;
      } else {
        console.error(
          'Token request failed with status code:',
          response.status
        );
        return '';
      }
    } catch (error) {
      console.error('Error while fetching Google access token:', error);
      return '';
    }
  }

  //Get the Google user information using the given token
  public static async getGoogleUser(token: string): Promise<GoogleUser> {
    let options: object = {
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    let response = await axios(options);
    let responseOK =
      response && response.status === 200 && response.statusText == 'OK';
    if (responseOK) {
      return response.data;
    }
    return { name: '', email: '', picture: '' };
  }

  //Google OAuth URL
  public static getGoogleUrl(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_RETURN_URL; // the redirect URI
    const responseType = 'code'; // the response type as "code"
    // Use full scope URLs or aliases provided by Google for profile and email
    const scope =
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'; //the scope(s) your application requires

    // Construct the authorization URL with the required parameters
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    return url;
  }
}

type GoogleUser = {
  email: string;
  name: string;
  picture: string;
};
