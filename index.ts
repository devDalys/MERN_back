import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {authValidator} from './validators/authValidator.ts';
import {validationResult} from 'express-validator';
import {RegistrationController} from './controllers/UserController.ts';

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(`mongodb://localhost:27017`, {
  dbName: 'instadram',
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    text: 'Hello world',
  });
});

// app.post('/auth/login', authValidator, ((req, res) => {
//   const errors = validationResult(req);
//
//   if (!errors.isEmpty()) {
//     return res.status(400).json(errors.array());
//   }
//   console.log(req.headers);
//   res.json({
//     status: 200,
//   });
// }));

app.post('/auth/register', authValidator, RegistrationController)




