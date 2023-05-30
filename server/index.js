
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from './config/mongo.js';
import userRouter from './routes/userRoutes.js';
import tweetRouter from './routes/tweetRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import chatRoutes from './routes/messageRoutes.js';
import messageRoutes from './routes/chatRoutes.js';

// Init express app
const app = express();

// Enable cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? `${process.env.CLIENT_URL}`
        : `${process.env.DEV_CLIENT_URL}`,
  })
);

// Enable incoming JSON data
app.use(express.json());

// Enable incoming Form-Data
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));


//Connection to DB
dbConnection().catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use('/api/user', userRouter);
app.use('/api/tweet', tweetRouter);
app.use('/api/comment', commentRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use('/public/images', express.static('public/images'));


// Endpoints
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the whatsapp API' });
});

app.listen(process.env.PORT, () => {
  console.log(`Port has started in port ${process.env.PORT}`);
});
