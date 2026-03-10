import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://harryjoshi2812:Harryjoshi28@cluster0.9c1ds.mongodb.net/Mojo").then(()=>console.log("DB connected"));
}
