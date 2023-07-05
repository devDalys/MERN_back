import express from 'express'
import {validationResult} from 'express-validator';

export const ErrorValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = validationResult(req);
  if(!result.isEmpty()){
    return res.status(404).json(result.array())
  }
  next()
}
