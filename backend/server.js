import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import moodRouter from "./routes/moodRoute.js";
import questionsRouter from "./routes/questionsRoute.js";
import suggestionRouter from "./routes/suggestionsRoutes.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/mood", moodRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/suggestions", suggestionRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
