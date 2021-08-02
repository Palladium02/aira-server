import express, { Request, Response, IRouter } from 'express';
import authentication from '../services/auth/Authentication';
import authGuard from '../utils/authGuard';

const Auth: IRouter = express.Router();

Auth.use(express.json());
Auth.use(express.urlencoded({ extended: false }));

Auth.post('/weblogin', (req: Request, res: Response) => {
  let email: string = req.body.email;
  let password: string = req.body.password;

  let { id, error } = authentication.login(email, password);
  if(id) {
    res
      .cookie('session', id, { signed: true })
      .send({
        error,
        isAuth: true,
      });
  } else {
    res.send({
      error,
      isAuth: false
    });
  }
});

Auth.post('/clientlogin', (req: Request, res: Response) => {
  let email: string = req.body.email;
  let password: string = req.body.password;

  let { id, error } = authentication.login(email, password);
  if(id) {
    res
      .send({
        error,
        id
      });
  } else {
    res.send({
      error,
      id
    });
  }
});

Auth.get('/isAuth', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      res.send({
        isAuth: true
      });
    },
    declined: (req: Request, res: Response) => {
      res.send({
        isAuth: false
      });
    }
  });
});

Auth.get('/logout', (req: Request, res: Response) => {
  let sessionCookie: string = req.signedCookies['session'];
  authentication.logout(sessionCookie);

  res
    .clearCookie(sessionCookie)
    .redirect('/');
});

export default Auth;
