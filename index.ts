import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {LoginValidator, AuthValidators} from './validators/authValidators.ts';
import {GetMeController, LoginController, RegistrationController} from './controllers/UserController.ts';
import {ErrorValidator} from './validators/errorValidator.ts';
import {CheckAuth} from './validators/checkAuth.ts';

dotenv.config();
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`App started on port ${port}`);

  mongoose.connect(`mongodb://localhost:27017`, {
    dbName: 'instadram',
  });
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));


app.use(cors());
app.use(express.json());

app.post('/auth/login', LoginValidator, ErrorValidator, LoginController);
app.post('/auth/register', AuthValidators, ErrorValidator, RegistrationController);
app.get('/auth/me', CheckAuth, GetMeController)




