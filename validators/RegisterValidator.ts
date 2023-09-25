import {body} from 'express-validator';

export const RegisterValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 50 }),
  body('firstName').isLength({ min: 2, max: 50 }),
  body('lastName').isLength({ min: 2, max: 50 })
];

export const LoginValidator = [
  body('email', 'Неверный логин или пароль').isEmail(),
  body('password', 'Неверный логин или пароль').isLength({ min: 5, max: 50 }),
]
