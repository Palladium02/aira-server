import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const run = (): void => {
  let app: Express = express();

  app.listen(80, () => {
    console.log(`Server up and running`);
  });
};

run();