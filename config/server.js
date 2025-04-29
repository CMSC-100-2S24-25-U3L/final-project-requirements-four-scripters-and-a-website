import express from "express";            // enables to use express servers
import router from "../routes/router.js";  // file containing all the API routes
import cors from 'cors';

const app = express();    // creates an instance of an Express application

app.use(express.json());  // parses json data {"name" : "Clarence"} as req.body                

// lets express understand data sent through HTML forms like "username=Clarence&password=1234" to req.body
app.use(express.urlencoded({ extended: true }));  

app.use(cors()); // allows requests to be sent even if coming from a differnet origin

// use the router for all routes
app.use("/", router);

app.listen(3000, () => {  // start listening for requests on port 3000
  console.log('Server running on http://localhost:3000');
});