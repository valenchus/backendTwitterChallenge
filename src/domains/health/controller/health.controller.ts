import { Request, Response, Router } from 'express';
import "express-async-errors";
import HttpStatus from 'http-status';


export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  // return res.status(HttpStatus.OK).send();
  return res.send("estado optimo!");
});
