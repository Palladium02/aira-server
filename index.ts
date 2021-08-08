import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import Auth from "./src/routes/Auth";
import API from "./src/routes/API";

const run = (): void => {
  let app: Express = express();

  app.use(cookieParser(process.env.COOKIE_SECRET!));
  app.use(express.static("public"));

  app.use("/auth", Auth);
  app.use("/api", API);

  app.get("/", (req: Request, res: Response) => {
    res.sendFile("./public/index.html");
  });

  app.listen(80, () => {
    console.log(`Server up and running`);
  });
};

run();
