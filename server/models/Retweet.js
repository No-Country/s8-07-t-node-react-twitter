import mongoose from 'mongoose';

const retweetSchema = new mongoose.Schema({
  isRetweet: {
    type: Boolean,
    default: true,
    inmutable: true,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
},
  { timestamps: true });


const Retweet = mongoose.model('Retweet', retweetSchema);

export default Retweet;