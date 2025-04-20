import mongoose from "mongoose";  // enables MongoDB connections

// connection string for the local database called 'project_practice'
const MONGO_URI = "mongodb://localhost:27017/project_practice";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,  // parses the MONGO_URI so that the code can understand where we want to go
  useUnifiedTopology: true, // engine that has better connections maipulation and monitoring
});

const db = mongoose.connection; // gives access to the mongoose connection

// listens for event continously, if there is an error, print message
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// listen for event once and then print out seccess message
db.once("open", () => console.log("Connected to MongoDB"));

// Export mongoose as default
export default mongoose;