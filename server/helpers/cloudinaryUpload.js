import { cloudinary } from "../config/cloudinary.js";

const cloudinaryUpload = async (file) => {
  try {
    const imageUrl = await cloudinary.uploader.upload(file)
    return imageUrl.secure_url
  } catch (error) {
    console.log(error)
    throw error
  }

};

export { cloudinaryUpload };
