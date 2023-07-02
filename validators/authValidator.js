import {body} from 'express-validator';

export const authValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 50 }),
];
