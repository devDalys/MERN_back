import * as express from 'express';
import {sendSuccess} from '../utils/SendError.ts';


const Upload = async (req: express.Request, res: express.Response) => {
  sendSuccess(res, {
    url: `uploads/${req.file?.filename}`,
  })
}

export const UploadControllers = {
  Upload
}
