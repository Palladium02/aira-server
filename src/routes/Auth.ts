import express, { Request, Response, IRouter } from "express";
import authentication from "../services/auth/Authentication";
import authGuard from "../utils/authGuard";
import Translations from "../loaders/Translations";
import LanguagePackage from "../services/i18n/LanguagePackage";

const Auth: IRouter = express.Router();

// @ts-ignore
Auth.use(express.json());
// @ts-ignore
Auth.use(express.urlencoded({ extended: false }));

Auth.post("/weblogin", (req: Request, res: Response) => {
  let email: string = req.body.email;
  let password: string = req.body.password;
  let language: string | undefined = req.headers["accept-language"];

  let languagePackage: LanguagePackage = Translations.getLanguage(language);

  let { id, error } = authentication.login(email, password);
  if (id) {
    res.cookie("session", id, { signed: true }).send({
      error,
      isAuth: true,
    });
  } else {
    res.send({
      error: languagePackage.translation.studio.login[error!.description],
      isAuth: false,
    });
  }
});

Auth.post("/clientlogin", (req: Request, res: Response) => {
  let email: string = req.body.email;
  let password: string = req.body.password;

  let { id, error } = authentication.login(email, password);
  if (id) {
    res.send({
      error,
      id,
    });
  } else {
    res.send({
      error,
      id,
    });
  }
});

Auth.post("/isAuth", (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      res.send({
        isAuth: true,
      });
    },
    declined: (req: Request, res: Response) => {
      res.send({
        isAuth: false,
      });
    },
  });
});

Auth.get("/logout", (req: Request, res: Response) => {
  let sessionCookie: string = req.signedCookies["session"];
  authentication.logout(sessionCookie);

  res.clearCookie(sessionCookie).redirect("/");
});

export default Auth;
