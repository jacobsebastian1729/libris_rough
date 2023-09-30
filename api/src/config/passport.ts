import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import GoogleTokenStrategy from 'passport-google-id-token';
import dotenv from 'dotenv';

import UserServices from '../services/user';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const userEmail = payload.email;
    const foundUser = await UserServices.findUserByEmail(userEmail);
    if (!foundUser) {
      return 'no user';
    }
    done(null, foundUser);
  }
);

export const jwtAdminStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const userEmail = payload.email;
    const foundUser = await UserServices.findUserByEmail(userEmail);
    if (!foundUser) {
      return 'no user';
    }
    if (foundUser.isAdmin === true) {
      done(null, foundUser);
    } else {
      done(null, false);
    }
  }
);

const Client_ID = process.env.CLIENT_ID as string;

export const googleStrategy = new GoogleTokenStrategy(
  { clientID: Client_ID },
  async (
    parsedToken: { payload: { given_name: string; email: string } },
    googleId: string,
    done: (error: any, user?: any, info?: any) => void
  ) => {
    console.log(parsedToken, 'parsedToken');
    const userPayload = {
      fullName: parsedToken.payload.given_name,
      email: parsedToken.payload.email,
    };
    const user = await UserServices.createOrFindUserByEmail(userPayload);
    done(null, user);
  }
);


