import * as express from 'express';


const Upload = async (req: express.Request, res: express.Response) => {
  res.status(200).json({
    url: `uploads/${req.file?.filename}`,
  });
}

export const UploadControllers = {
  Upload
}
