import { JwtPayload, Secret, JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export class UserUtils {
  public static createAccessToken = (payload: TokenPayload): string => {
    let SECRET: Secret = process.env.SECRET!;
    console.log(SECRET);
    let accessToken: string = jwt.sign(payload, SECRET, { expiresIn: '24h' });
    console.log(accessToken);
    return accessToken;
  };

  //ensure the user is logged in
  public static ensureLoggedInMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let clientToken = req.headers.authorization.split(' ')[1];
      let SECRET: Secret = process.env.SECRET!;
      let token = jwt.verify(clientToken, SECRET);
      return next();
    } catch (JsonWebTokenError) {
      return res.status(401).json({
        message:
          'Access denied. You are not authorized to perform this action.',
        error: JsonWebTokenError,
      });
    }
  };

  //ensure its the right user
  public static ensureRightUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let clientToken = req.headers.authorization.split(' ')[1];
      let SECRET: Secret = process.env.SECRET!;
      let token: any = jwt.verify(clientToken, SECRET);

      //if the user ID of the token matches the ID from the request
      if (token.userId === req.params.id) {
        return next();
      }

      //if you're an admin
      if (token.isAdmin) {
        return next();
      }
      return res.status(401).json({
        message: 'You do not have the authority to carry out this action.',
      });
    } catch (JsonWebTokenError) {
      return res.status(401).json({
        message: 'You do not have the authority to carry out this action.',
        error: JsonWebTokenError,
      });
    }
  };

  //ensure the user is an admin
  public static ensureIsAdminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let clientToken = req.headers.authorization.split(' ')[1];
      let SECRET: Secret = process.env.SECRET!;
      let token: any = jwt.verify(clientToken, SECRET);
      //if the user is not an admin, or if admin=false

      if (!token.isAdmin) {
        return res.status(401).json({
          message: 'You do not have the authority to carry out this action.',
        });
      }

      return next();
    } catch (JsonWebTokenError) {
      return res.status(401).json({
        message: 'You do not have the authority to carry out this action.',
        error: JsonWebTokenError,
      });
    }
  };
}

type TokenPayload = {
  email: String;
  isAdmin: Boolean;
  userId: String;
};
