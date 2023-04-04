import { Request, Response, Router } from 'express';
import "express-async-errors";
import HttpStatus from 'http-status';


export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  console.log("Health API Valentin");

  return res.status(HttpStatus.OK).send();

  // return res.send("api health");
});
