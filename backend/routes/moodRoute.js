import express from "express";
import { logMood, getWeeklyMood, getTodaysMood } from "../controllers/moodController.js";
import { getAnswers } from "../controllers/questionsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const moodRouter = express.Router();

moodRouter.post("/log", authMiddleware, logMood);
moodRouter.get("/weekly", authMiddleware, getWeeklyMood);
moodRouter.get("/today/:userId", authMiddleware, getTodaysMood);
moodRouter.get("/get-answers/:userId", authMiddleware, getAnswers);

export default moodRouter;
