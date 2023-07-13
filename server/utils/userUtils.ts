import jwt, { JwtPayload, Secret, JsonWebTokenError } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserUtils {
  public static createAccessToken = (payload: TokenPayload): string => {
    let SECRET: Secret = process.env.SECRET!;

    let accessToken: string = jwt.sign(payload, SECRET, { expiresIn: '24h' });

    return accessToken;
  };
}

type TokenPayload = {
  email: String;
  isAdmin: Boolean;
  userId: String;
};
