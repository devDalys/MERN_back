import bcrypt from 'bcrypt';
import UserModel from '../models/users.ts';
import * as express from 'express'
import {UserRequest} from './types.ts';
import jwt from 'jsonwebtoken';
import {sendError} from '../utils/sendError.ts';

const Registration = async (req: express.Request<any,any, UserRequest>, res: express.Response) => {
 try{
   const password = req.body.password;

   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt)

   const doc = new UserModel ({
     email: req.body.email,
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     passwordHash: hashPassword
   })

   const user  = await doc.save();

   const token = jwt.sign(
     {
       _id: user._id
     },
     process.env.SECRET as string,
     {
       expiresIn: '30d'
     }
   );

   const {passwordHash, ...userInfo} = user.toObject();
   res.json({...userInfo, token})
 }catch (e) {
   sendError({res, errorCode: 500, messageText: 'Что-то пошло не так'})
 }
}

const Login = async (req: express.Request<any,any, UserRequest>, res: express.Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return sendError({errorCode: 404, res, messageText: 'Неверный логин или пароль'})
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.toObject().passwordHash);
    if (!isValidPass) {
      return sendError({errorCode: 404, res, messageText: 'Неверный логин или пароль'})
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.SECRET as string,
      {
        expiresIn: '30d'
      }
    );

    const { passwordHash, ...userData } = user.toObject();
    res.json({ ...userData, token });
  } catch (err) {
    sendError({errorCode: 500, res, messageText: 'Не удалось авторизоваться'})
  }
};

const GetMe = async(req: express.Request<any,any, UserRequest>, res: express.Response) => {
  try {
    const user = await UserModel.findById(req.body.userId)
    if (!user) {
      return sendError({res, errorCode: 403, messageText: 'Авторизация провалена'})
    }
    const {passwordHash, ...data} = user.toObject()
    res.json(data)
  }catch (e) {
    sendError({res, errorCode: 500, messageText: 'Что-то пошло не так'})
  }
}

export const AuthController = {
  GetMe,
  Login,
  Registration
}
