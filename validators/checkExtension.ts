import express from 'express';
import path from 'path';
import {sendError} from '../utils/SendError.ts';
import * as fs from 'fs';

export const checkExtension = (req: express.Request<any, any, FormData>, res: express.Response, next: express.NextFunction) => {
  const extension = path.extname(req.file?.originalname as string);
  if (!['.png', '.jpg', '.jpeg'].includes(extension)) {
    fs.unlink(`uploads/${req.file?.filename}`, () => null)
    return sendError({res, errorCode: 400, messageText: 'Неверный формат изображения'});
  }
  next();
};
