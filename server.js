import express from "express";
import pool from "./db.js";
//import applications from "./JobData.js";

const app = express();
const PORT = 3000;
app.use(express.json());



//get all user data 

app.get("/api/applications",async(req,res)=>{   
  
  let status = req.query.status; 
   let search = req.query.search;    
   //console.log(search);
  try{                
  if(search){   
let data = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id where companies.company_name = $1",[search]); 
return res.status(200).json(data.rows);
} 
  }catch(err){
   return res.status(500).json({
    message:"Db error"
   });
  }
try{
    if(status){
let data = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id where applications.status = $1",[status]);    
      
  return res.status(200).json(data.rows);
      }  
}catch(err){ 
  return res.status(500).json({
    message : "Db error"
  });
}   

try{
 let applicationData = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id");                                       
   return res.status(200).json(applicationData.rows); 
}catch(error){
  return res.status(500).json({
    message : "Db error"
  })
}
});


//get user data on id 
app.get("/api/applications/:id",async(req, res) => {
    let id = Number(req.params.id);
    console.log(id);
  
    let data = null;

     try{
     data = await pool.query("select * from applications inner join companies on companies.company_id = applications.company_id where applications.app_id = $1",[id]);

       
      if(data.rowCount == 0){
        return res.status(404).json({
            message: `${id} is not found`
        });
      }
     if(data.rowCount == 1){
       return res.status(200).json(data.rows); 
     }   
     }catch(error){ 
    res.status(500).json({
      message : "Db error in get"
    });
     }
}); 


app.post("/api/applications",async (req,res)=>{
    let body = req.body;
let company_id = Number(body.company_id)
  

try{
let data = await pool.query("insert into applications(role,status,applied_date,notes,company_id) values($1, $2, $3, $4,$5) returning app_id",[body.role, body.status,body.applied_date,body.notes,company_id]);
      
res.status(201).json({
  message : `application id ${data.rows[0].app_id} sucessfully created !`
});
}catch(err){ 
  res.status(500).json({ 
    error : err.message,
    message : "Db error in post"
  });
}
}); 


app.put("/api/applications/:id",async (req,res)=>{
  let body = req.body;
  let company_id = Number(body.company_id);
  let id = Number(req.params.id);
  let data = null;
  
  try{
 data = await pool.query("update applications set role = $1,status = $2,applied_date = $3,notes = $4,company_id = $5 where applications.app_id = $6 returning *",[body.role,body.status,body.applied_date,body.notes,company_id,id]); 


if(data.rowCount == 0){
        return res.status(404).json({
            message: `${id} is not found`
        });
      }
     if(data.rowCount == 1){
       return res.status(201).json({
          message :"Data is updated",
         data : data.rows[0]
       });
     }   
  }catch(err){
   return res.status(500).json({ 
    error : err.message,
    errorCode : err.code,
    message : "Db error in put !"
   });
  } 
});


app.delete("/api/applications/:id",async (req,res)=>{
  let id = Number(req.params.id);
  let data = null;
  try{
  data = await pool.query("delete from applications where app_id = $1",[id]);

    if(data.rowCount == 1){
     return res.status(200).json({
       message : `${id} deleted sucessfully!!`
     })
     }
  }catch(error){
    return res.status(500).json({
      message : " Db error in delete",
      erorr : error.message 
    })
  }
  if(data.rowCount == 0){
  res.status(404).json({
    "message" : `${id} not found`
  }); 
 }
});


app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
});