import { Router } from "express";
import { allMessages, sendMessage, deleteMessage, updateMessage } from "../controllers/messageController.js";
//!const { protect } = require("../middleware/authMiddleware");

import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';
const chatRoutes = Router();

chatRoutes.route("/:chatId").get(sessionMiddleware, allMessages);
chatRoutes.route("/:chatId").get(sessionMiddleware, deleteMessage);
chatRoutes.route("/:chatId").get(sessionMiddleware, updateMessage);
chatRoutes.route("/").post(sessionMiddleware, sendMessage);

export default chatRoutes
