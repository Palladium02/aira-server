import { Request, Response } from 'express';
import authentication from '../services/auth/Authentication';

interface authGuardOptions {
  req: Request,
  res: Response,
  accepted: (req: Request, res: Response) => void,
  declined: (req: Request, res: Response) => void;
}

const authGuard = ({ req, res, accepted, declined }: authGuardOptions) => {
  let sessionCookie = req.signedCookies['session'];
  let sessionToken = req.body?.sessionToken;

  if(!req.body) req['body'] = {};

  if(!sessionCookie) {
    if (!authentication.isValidId(sessionToken)) { declined(req, res); return; };
  } else if(sessionCookie) {
    if (!authentication.isValidId(sessionCookie)) { declined(req, res); return; };
  } else {
    if (!authentication.isValidId(sessionToken)) { declined(req, res); return; };
  }

  if(sessionCookie) {
    req.body.id = sessionCookie;
  } else if(sessionToken) {
    req.body.id = sessionToken;
  }

  accepted(req, res);
};

export default authGuard;