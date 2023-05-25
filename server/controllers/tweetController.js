import Tweet from '../models/Tweet.js'
import path from "path";
import { fileURLToPath } from 'url';
import { cloudinaryUpload } from '../helpers/cloudinaryUpload.js';
import {unlinkSync} from 'fs';
import sharp from 'sharp';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//crear tweet
const createTweet = async (req, res) => {
//    //const id = req.user.id;
//    const { content, hashtags } = req.body;
//    const images = req.files;
 
//    try {
//      const imagePaths = images.map((image) => {
//        const imagePath = path.join('public/images', `${image.filename}.jpg`);
//        return imagePath;
//      });
 
//      const tweet = new Tweet({
//        //author: id,
//        content,
//        hashtags,
//        images: imagePaths,
//      });
 
//      await tweet.save();
 
//      res.status(201).json(tweet);
//    } catch (error) {
//      console.error(error);
//      res.status(500).json({ error: 'Failed to create tweet' });
//    }
//  };
   //const id = req.user.id;
   const { content, hashtags } = req.body;
   const images = req.files;

  try {
    const imagePaths = await Promise.all(
      images.map(async (image) => {
        const { path, filename } = image;
        try {
          const optimizedImagePath = `public/images/${filename}.webp`;
          await sharp(path)
            .webp({ quality: 75 })
            .toFile(optimizedImagePath);
          const imagePath = await cloudinaryUpload(optimizedImagePath);
          unlinkSync(optimizedImagePath)
          unlinkSync(path);
          return imagePath;
        } catch (error) {
          unlinkSync(path);
          throw error;
        }
      })
    );
     
     const tweet = new Tweet({
       // author: id,
       content,
       hashtags,
       images: imagePaths,
     });
 
     await tweet.save();
 
     res.status(201).json(tweet);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to create tweet' });
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
      res.status(500).json({ message: 'Error al obtener los tweets del usuario' });
    }
  }
  
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
        return res.send({ message: "Este tweet no existe." });
      }
  
      res.send(modifiedTweet);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Error al actualizar el tweet." });
    }
  };
  
//like a tweet
const likeTweet = async (req, res) => {
    const tweetId = req.params.id;
    const userId = req.params.userId; // Obtener el ID del usuario desde los parámetros de la URL
  
    try {
      const tweet = await Tweet.findById(tweetId);
  
      if (!tweet) {
        return res.status(404).json({ message: "Tweet no encontrado" });
      }
  
      // Verificar si el usuario ya dio like al tweet
      const alreadyLiked = tweet.likes && tweet.likes.some(
        (like) => like.user.toString() === userId
      );
  
      if (alreadyLiked) {
        return res.status(400).json({ message: "Tweet ya tiene me gusta" });
      }
  
      // Agregar el like al tweet
      tweet.likes.push({ user: userId });
      await tweet.save();
  
      res.json(tweet.likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error del servidor" });
    }
  };

//unlike a tweet
const unlikeTweet = async (req, res) => {
    const tweetId = req.params.id;
    const userId = req.params.userId; // Obtener el ID del usuario desde los parámetros de la URL
  
    try {
      const tweet = await Tweet.findById(tweetId);
  
      if (!tweet) {
        return res.status(404).json({ message: "Tweet no encontrado" });
      }
  
      const likeIndex = tweet.likes.findIndex(
        (like) => like.user === userId
      );
  
      if (likeIndex === -1) {
        return res.status(400).json({ message: "El tweet no tiene me gusta del usuario" });
      }
  
      tweet.likes.splice(likeIndex, 1);
      await tweet.save();
  
      res.json(tweet.likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error del servidor" });
    }
  };
  
  
export {
    createTweet,
    getTweetsByUserId,
    updateTweet,
    likeTweet,
    unlikeTweet
}