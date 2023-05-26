
import Tweet from '../models/Tweet.js';


//crear tweet
const createTweet = async (req, res) => {

  const { id } = req.user;
  const { content, hashtags } = req.body;
  const images = req.files;

  try {
    const imagePaths = images.map((image) => {
      const imagePath = `${process.env.API_URL}/public/images/${image.filename}`;
      return imagePath;
    });

    let tweet = new Tweet({
      author: id,
      content,
      hashtags,
      images: imagePaths,
    });

    await tweet.save();
    tweet = (await tweet.populate('author', 'name image username email confirmed'));

    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create tweet' });
  };
}
    //await User.findByIdAndUpdate(userId, { $push: { tweets: tweet._id } });
//     tweet = (await tweet.populate('author', 'name image username email confirmed'));

//     res.send(tweet);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const getAllTweets = async (_req, res) => {
  try {
    const allTweets = await Tweet.find().populate(
      'author',
      'name image username email confirmed'
    ).populate('likes','name image username email').sort({createdAt: -1});
    res.status(200).send(allTweets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error getting all tweets' });
  }
};


//traer tweets por usuario
const getTweetsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tweets = await Tweet.find({ author: userId }).populate('author');
    res.json(tweets);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error al obtener los tweets del usuario' });
  }
};

//editar tweet
const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { content, hashtags } = req.body;

  try {
    let modifiedTweet = await Tweet.findOneAndUpdate(
      { _id: id },
      { content, hashtags },
      { new: true }
    );

    if (!modifiedTweet) {
      return res.send({ message: 'Este tweet no existe.' });
    }

    res.send(modifiedTweet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Error al actualizar el tweet.' });
  }
};

//like a tweet
const likeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { id } = req.user;  // Obtener el ID del usuario desde el middleware
  
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet no encontrado' });
    }

    // Verificar si el usuario ya dio like al tweet
    const alreadyLiked = tweet.likes.includes(id);

    if (alreadyLiked) {
      // Si ya dio like, eliminar el like
      tweet.likes = tweet.likes.filter(userId => userId.toString() !== id);
      await tweet.save();
      res.json({ message: 'Like eliminado correctamente' });
    } else {
      // Si no dio like, agregar el like
      tweet.likes.push(id);
      await tweet.save();
      res.json({ message: 'Like agregado correctamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export {
  createTweet,
  getTweetsByUserId,
  updateTweet,
  likeTweet,
  getAllTweets,
};
