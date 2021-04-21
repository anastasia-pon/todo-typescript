import { Request, Response, NextFunction } from "express";
import OktaJwtVerifier from '@okta/jwt-verifier';
// import { RequestWithJwt } from '../interfaces/request.interface';

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  assertClaims: { cid: process.env.OKTA_CLIENT_ID },
});
declare global {
  namespace Express {
    interface Request {
      jwt?: string | boolean;
    }
  }
}
export const authenticationRequired = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return res.status(401).json('Unauthorized');
  }

  const accessToken = match[1];
  const audience = 'api://default';
  try {
    const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
    req.jwt = jwt;
    next()
  } catch (err) {
    // try sending an authrized request from the front end react app
    console.log(req.jwt, 'request');
    console.log(err, 'error')
    res.status(401).json(err.message);
  }
    // .then(jwt => {
    //   req.jwt = jwt;
    //   next();
    // })
    // .catch(err => {
    //   // look over error handling
    //   res.status(401).send(err.message);
    // });
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    req.jwt = false;
    return next();
  }
  const accessToken = match[1];
  const audience = 'api://default';

  // return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
  try {
    const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
    req.jwt = jwt;
    next()
  } catch (err) {
    req.jwt = false;
    // try sending an authrized request from the front end react app
    // console.log(req.jwt,
    // res.status(401).json(err.message);
    next()
  }
    // .then(jwt => {
    //   req.jwt = jwt;
    //   next();
    // })
    // .catch(() => {
    //   req.jwt = false;
    //   next();
    // });
};

// module.exports = { authenticationRequired, authenticateUser };
