import express from "express";
import { saveAnswers } from "../controllers/questionsController.js";

const questionsRouter = express.Router();

questionsRouter.post("/save-answers", saveAnswers);

export default questionsRouter;
