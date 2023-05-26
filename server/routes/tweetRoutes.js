import { Router } from 'express';
import {
  createTweet,
  getTweetsByUserId,
  updateTweet,
  likeTweet,
  getAllTweets,
} from '../controllers/tweetController.js';

import upload from '../middlewares/multer.js';


import { sessionMiddleware } from '../middleware/sessionMiddleware.js';

const tweetRouter = Router();

tweetRouter.post('/create', sessionMiddleware, createTweet);

const tweetRouter = Router();

//tweetRouter.post('/create', upload.array('images'), createTweet);

tweetRouter.get('/user/:userId', getTweetsByUserId);
tweetRouter.get('/tweets', getAllTweets);
tweetRouter.put('/:id', sessionMiddleware, updateTweet);
tweetRouter.put('/like/:id', sessionMiddleware, likeTweet);

export default tweetRouter;
