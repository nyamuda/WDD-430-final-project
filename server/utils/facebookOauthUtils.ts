import { JwtPayload, Secret, JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { Review } from '../models';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export class FacebookOauthUtils {
  // Function to get the Facebook access token using the code
  public static async getFacebookAccessToken(code: string): Promise<string> {
    try {
      const clientId = process.env.FACEBOOK_APP_ID;
      const clientSecret = process.env.FACEBOOK_APP_SECRET;
      const redirectUri = process.env.FACEBOOK_RETURN_URL;
      const grantType = 'authorization_code';

      const response = await axios.get(
        'https://graph.facebook.com/v17.0/oauth/access_token',
        {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
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
      console.error('Error while fetching Facebook access token:');
      return '';
    }
  }

  // Function to get Facebook user information using the given token
  public static async getFacebookUser(token: string): Promise<object> {
    try {
      const response = await axios.get('https://graph.facebook.com/v17.0/me', {
        params: {
          fields: 'name,email,picture',
          access_token: token,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'User info request failed with status code:',
          response.status
        );
      }
    } catch (error) {
      console.error('Error while fetching Facebook user info:', error);
    }
  }

  // Function to construct the Facebook OAuth URL
  public static getFacebookUrl(): string {
    const clientId = process.env.FACEBOOK_APP_ID;
    const redirectUri = process.env.FACEBOOK_RETURN_URL;
    const responseType = 'code';

    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=email`;

    return url;
  }
}

type FacebookUser = {
  email: string;
  name: string;
  picture: string;
};
