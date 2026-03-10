import express from "express"
import { getSuggestion } from "../controllers/suggestionsController.js"

const suggestionRouter = express.Router()

suggestionRouter.post('/', getSuggestion);

export default suggestionRouter;