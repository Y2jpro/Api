import express from "express";
import pool from "./db.js";
import applicationRoute from "./routes/applicationRoutes.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(logger);


//get all user data  
function  logger(req,res,next){
 console.log(req.method, req.url);
  next();
}

app.use("/api/applications",applicationRoute);
///

//get user data on id 
app.use("/api/applications/:id",applicationRoute);

app.use("/api/applications",
         applicationRoute);


app.use("/api/applications",
        applicationRoute);

app.use("/api/applications",
  applicationRoute); 

app.use("/api/applications/:id",
           applicationRoute);

app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
});