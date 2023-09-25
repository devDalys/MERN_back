import express from 'express'
import {validationResult} from 'express-validator';
import {sendError} from '../utils/SendError.ts';

export const ErrorValidator = {
    fullValidator(req: express.Request, res: express.Response, next: express.NextFunction){
      const result = validationResult(req);
      if(!result.isEmpty()){
        // const res = result.mapped()
        return res.status(404).json(result.array())
      }
      next()
    },
    minifiedValidator(req: express.Request, res: express.Response, next: express.NextFunction){
      const result = validationResult(req);
      if(!result.isEmpty()){
        return sendError({res, messageText: result.array()[0].msg, errorCode: 404})
      }
      next()
    }

}
