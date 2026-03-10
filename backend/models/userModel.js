import mongoose from "mongoose";

const moodLogSchema = new mongoose.Schema({
    date: { type: String },  
    emoji: { type: String },
    notes: { type: String },  
    intensity: { type: Number }  
})

const answersSchema = new mongoose.Schema({
    date: { type: String },
    answers: {
        type: Array,
        default: []
    }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    moodData: [moodLogSchema],
    answersData: [answersSchema] 
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
