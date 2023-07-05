import bcrypt from 'bcrypt';
import UserModel from '../models/users.ts';
import * as express from 'express'
import {UserRequest} from './types.ts';
import jwt from 'jsonwebtoken';

export const RegistrationController = async (req: express.Request<any,any, UserRequest>, res: express.Response) => {
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
   res.status(400).json({msg: 'Не удалось зарегистрироваться'})
 }
}

export const LoginController = async (req: express.Request<any,any, UserRequest>, res: express.Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        msg: 'Неверный логин или пароль'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.toObject().passwordHash);
    if (!isValidPass) {
      return res.status(404).json({
        msg: 'Неверный логин или пароль'
      });
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
    console.log(err);
    res.status(500).json({
      msg: 'Не удалось авторизоваться '
    });
  }
};

export const GetMeController = async(req: express.Request<any,any, UserRequest>, res: express.Response) => {
  try {
    const user = await UserModel.findById(req.body.userId)
    if (!user) {
      return res.sendStatus(403)
    }
    const {passwordHash, ...data} = user?.toObject()
    res.json({data})
  }catch (e) {
    res.sendStatus(500)
  }
}
