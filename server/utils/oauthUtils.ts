import { JwtPayload, Secret, JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { Review } from '../models';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export class OauthUtils {
  //Get the Google access token using the code
  public static async getGoogleAccessToken(code: string): Promise<string> {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = 'http://localhost:8000/oauth/google/callback'; // the redirect URI
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
      }
    } catch (error) {
      console.error('Error while fetching Google access token:', error);
    }

    return '';
  }

  //Get the Google user information using the given token
  public static async getGoogleUser(token: string): Promise<string> {
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
    return '';
  }
}

type TokenPayload = {
  email: String;
  isAdmin: Boolean;
  userId: String;
};
