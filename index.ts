import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {LoginValidator, RegisterValidator} from './validators/RegisterValidator.ts';
import {
  AuthController,
} from './controllers/UserController.ts';
import {ErrorValidator} from './validators/errorValidator.ts';
import {checkAuth} from './validators/checkAuth.ts';
import {PostsControllers} from './controllers/PostsController.ts';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import {checkExtension} from './validators/checkExtension.ts';
import {UploadControllers} from './controllers/UploadController.ts';

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
    callback(null, uuidv4() + path.extname(file.originalname));
  }
})

const upload = multer({storage});

app.post('/upload', checkAuth, upload.single('image'),checkExtension, UploadControllers.Upload);

app.post('/auth/login', LoginValidator, ErrorValidator, AuthController.Login);
app.post('/auth/register', RegisterValidator, ErrorValidator, AuthController.Registration);
app.get('/auth/me', checkAuth, AuthController.GetMe);

app.post('/posts', checkAuth, PostsControllers.CreatePost);
app.get('/posts', checkAuth, PostsControllers.GetPosts);




