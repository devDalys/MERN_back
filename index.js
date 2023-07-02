import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {authValidator} from './validators/authValidator.js';
import {validationResult} from 'express-validator';

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@instacluster.12uwrs7.mongodb.net/\n`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.post('/auth/login', authValidator, ((req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  console.log(req.headers);
  res.json({
    status: 200,
  });
}));




