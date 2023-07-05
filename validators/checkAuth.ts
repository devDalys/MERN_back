import express from 'express'
import jwt from 'jsonwebtoken';

export const CheckAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.accesstoken as string;

  if(!token){
    return res.sendStatus(404);
  }

  try {
    const result = jwt.verify(token, process.env.SECRET as string) as {_id: string};
    req.body.userId  = result._id
    next();
  } catch (e) {
    console.log(e)
    return res.sendStatus(403);
  }

}
