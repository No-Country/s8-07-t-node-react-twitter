import { ObjectId } from 'mongodb';
import Comment from "../models/Comment.js";
import Session from "../models/Session.js";
import Tweet from "../models/Tweet.js";
import User from "../models/User.js";

//ver perfil
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'No se pudo encontrar el usuario.' })
    }
    const profile = await User.findById(id).populate('likes tweets comments followers following');
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al encontrar el usuario.' });
  }
};

const getSessionToken = async (req, res) => {
  try {
    const { id } = req.params;    
    if(!id) {
      res.status(400).json({ error: 'Es necesario el ID del usuario.' })
    }
    const userSessionToken = await Session.findOne({ userId: id });
    res.status(200).json(userSessionToken.sessionToken)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el token de sesión.' });
  }
}

const getMyProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const profile = await User.findById(id).populate('likes tweets comments followers following');
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
}

const updateMyProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { bio, username, name, confirmed } = req.body;
    const updatedProfile = await User.findByIdAndUpdate(id, {
      bio, username, name, confirmed
    }, { new: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
}

const deleteMyProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const deletedProfile = await User.findByIdAndDelete(id)
    const deletedTweets = await Tweet.findOneAndDelete({ author: id })
    const deletedComments = await Comment.findOneAndDelete({ author: id })
    const deletedSession = await Session.findOneAndDelete({ userId: id })
    res.status(200).json("El perfil, los tweets y comentarios se han eliminado correctamente.")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el perfil.' });
  }
}

//seguir usuario
const followUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = req.params.id;

    if (!id || !userId) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar los IDs de usuario" });
    }

    if (id === userId) {
      return res.status(400).json({ message: "No puedes seguirte a ti mismo" });
    }

    const user = await User.findById(id);
    const followedUser = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.following.includes(userId)) {
      return res.status(400).json({ message: "Ya sigues a este usuario" });
    }

    user.following.push(userId);
    followedUser.followers.push(id);
    await user.save();
    await followedUser.save();
    return res
      .status(200)
      .json({ message: "Has comenzado a seguir a este usuario" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//dejar de seguir
const unfollowUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = req.params.id;

    if (!id || !userId) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar los IDs de usuario" });
    }

    if (id === userId) {
      return res
        .status(400)
        .json({ message: "No puedes dejar de seguirte a ti mismo" });
    }

    const user = await User.findById(id);
    const followedUser = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!user.following.includes(userId)) {
      return res.status(400).json({ message: "No sigues a este usuario" });
    }

    user.following = user.following.filter(
      (usersId) => usersId.toString() !== userId
    );

    followedUser.followers = followedUser.followers.filter(
      (followerId) => followerId.toString() !== id
    );

    await user.save();
    await followedUser.save();

    return res
      .status(200)
      .json({ message: "Has dejado de seguir a este usuario" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//traer seguidos
const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate(
      "following",
      "name email"
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user.following);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await User.find({}, 'name image username email confirmed').exec();
    res.status(200).json(allUsers)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "No se pudieron obtener todos los usuarios" });
  }
}

export {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getProfileById,
  followUserById,
  unfollowUserById,
  getFollowing,
  getAllUsers,
  getSessionToken
};
