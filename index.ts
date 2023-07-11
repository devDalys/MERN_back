import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {LoginValidator, ExpressValidators} from './validators/ExpressValidators.ts';
import {GetMeController, LoginController, RegistrationController} from './controllers/UserController.ts';
import {ErrorValidator} from './validators/errorValidator.ts';
import {CheckAuth} from './validators/checkAuth.ts';
import {CreatePost, GetPosts} from './controllers/PostsController.ts';
import multer from 'multer'
import path from 'path';

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
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename(_, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    callback(null, file.originalname);
  }
})

const upload = multer({storage});

app.post('/upload',CheckAuth, upload.single('image'), ((req, res) => {
  res.status(200).json({
    url: `uploads/${req.file?.originalname}`
  })
}))

app.post('/auth/login', LoginValidator, ErrorValidator, LoginController);
app.post('/auth/register', ExpressValidators, ErrorValidator, RegistrationController);
app.get('/auth/me', CheckAuth, GetMeController)

app.post('/posts', CheckAuth, CreatePost)
app.get('/posts', CheckAuth, GetPosts)




