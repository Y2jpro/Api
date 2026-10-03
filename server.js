import express from "express";
import pool from "./db.js";
//import applications from "./JobData.js";

const app = express();
const PORT = 3000;
app.use(express.json());



//get all user data 
app.get("/api/applications",(req,res)=>{    let status = req.query.status; 
   let search = req.query.search;    
                               
     if(search){
const results = applications.filter(app => app.company === search);
return res.status(200).json(results);
   }                            
      if(status){
     const result = applications.filter(app => app.status === status);
      return res.status(200).json(result);
      }                               
   res.status(200).json(applications);
});

//get user data on id 
app.get("/api/applications/:id", (req, res) => {
    let id = Number(req.params.id);
    let applicationsData = null;

    for (let i = 0; i < applications.length; i++) {
        if (applications[i].id === id) {
            applicationsData = applications[i];
            break;
        }
    }

    if (!applicationsData) {
        return res.status(404).json({
            message: `${id} is not found`
        });
    }

    res.status(200).json(applicationsData);
}); 


app.post("/api/applications",(req,res)=>{
    let body = req.body;
     
    applications.push({
    id: Number(body.id),
    company: body.company,
    role: body.role,
    status: body.status,
    appliedDate: body.appliedDate,
    notes: body.notes
  });
  res.status(201).json({
  "message" : `${body.id} is created!`
  })
});
app.put("/api/applications/:id",(req,res)=>{
  let body = req.body;
  let id = Number(req.params.id);
  let application = null;
for(let i = 0;i < applications.length;i++){   
  
  if(applications[i].id === id){  
     application = applications[i];
     application = body;
     application.id = Number(body.id);
    break;
  } 
} 

  if(!application){
   res.status(404).json({
     "message" : `${id} not found`
   });
  }else{
    res.status(201).json({
      "message" : `sucessfully ${id} is updated`
    });
  }
  
});


app.delete("/api/applications/:id",(req,res)=>{
  let id = Number(req.params.id);
  let application = null;
for(let i = 0;i < applications.length;i++){   
  if(applications[i].id === id){  
     application = applications[i];
    applications.splice(i,1); 
    return res.status(200).json({
    "message" : `${id} sucessfully deleted`
  });    
  } 
}  
  if(!application){
  res.status(404).json({
    "message" : `${id} not found`
  }); 
 }
});


app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
});