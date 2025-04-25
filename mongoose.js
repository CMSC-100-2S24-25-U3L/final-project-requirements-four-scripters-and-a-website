import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Use full MongoDB URI from .env
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB Atlas!"));

export default mongoose;
