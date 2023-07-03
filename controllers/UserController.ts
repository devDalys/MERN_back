import bcrypt from 'bcrypt';
import UserModel from '../models/users.ts';
import * as express from 'express'
import {UserRequest} from './types.ts';
import jwt from 'jsonwebtoken';

export const RegistrationController = async (req: express.Request<any,any, UserRequest>, res: express.Response) => {
  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt)

  const doc = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passwordHash: hashPassword
  })

  const user = await doc.save();

  const token = jwt.sign(
    {
      _id: user._id
    },
    'somesecretbruh',
    {
      expiresIn: '30d'
    }
  );
  res.json({
    msg: 'Регистрация прошла успешно'
  })
}
