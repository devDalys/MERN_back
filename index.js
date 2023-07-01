import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

const connect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@instacluster.12uwrs7.mongodb.net/\n`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'instadram',
    });
  } catch (e) {
    console.log(e);
  }
};

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
connect();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    text: 'Hello world',
  });
});

app.post('/auth/login', ((req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.json({
    status: 200,
  });
}));




