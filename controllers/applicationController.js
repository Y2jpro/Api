import pool from "../db.js"
import * as applicationService 
  from "../service/applicationService.js"
import * as validation from "../validators/applicationValidator.js";

export const getAllUserData = async (req,res)=>{   
  let status = req.query.status; 
   let search = req.query.search;    
   //console.log(search);
  try{                
  if(search){   
let data = await applicationService.getSearchUser(search); 
    
return res.status(200).json(data.rows);
} 
  }catch(err){
   return res.status(500).json({
    message:"search Db error"
   });
  }
try{
    if(status){
let data = await applicationService.getStausUsers(status);
      
  return res.status(200).json(data.rows);
      }  
}catch(err){ 
  return res.status(500).json({
    message : "status Db error"
  });
}   

try{
 let applicationData = await applicationService.getAllUsers();                             
   return res.status(200).json(applicationData.rows); 
}catch(error){
  return res.status(500).json({ 
    error : error.message,
    message : "Db error"
  })
}
};


export const createUser = async (req,res)=>{ 
    let IsCompanyExist = null;
    let body = req.body; 
let company_id = body.company_id;
  const result = validation.applicationSchema.safeParse(body,company_id);
  console.log(result);

try{ 
  IsCompanyExist = await applicationService.IscompanyExist(company_id);
  }catch(err){
     return res.json({
     message :"company id not exist ,please enter valid id (createUser)",
       errror : err.message
     });
}
  if(IsCompanyExist.rowCount !=0 && result.success){
try{ 
let data = await applicationService.createUser(body,company_id);
      
res.status(201).json({
  message : `application id ${data.rows[0].app_id} sucessfully created !`
});
}catch(err){ 
  res.status(500).json({ 
    error : err.message,
    message : "Db error in post"
  });
} 
}else{
   return res.json({
      message : "company id is not exist!"
     });
}
} // end of function 





export const updateUser = async (req,res)=>{
  let body = req.body;
  let IsCompanyExist = null;
  let company_id = body.company_id;  
  let id = Number(req.params.id);
  let data = null; 

  
 const result = validation.applicationSchema.safeParse(body,company_id); 
 let isUserExist = await applicationService.IsUserExist(id);
  
  if(isUserExist.rowCount == 0){
    return res.json({
      message : "application is not exist (updateUser)",
  });
  }
  
try{ 
  IsCompanyExist = await applicationService.IscompanyExist(company_id);
  }catch(err){
     return res.json({
      message : "company id not exist ,please(createUser)",
       errror : err.message
  });
}


  
if(IsCompanyExist.rowCount!=0 && result.success){
  try{  
 data = await applicationService.updateUsersData(body,company_id,id);

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
  } // if block
}else{
  return res.json({
      message : "company id is not exist!"
     });
}
} // end of block update user

export const deleteUser = async (req,res)=>{
  let id = Number(req.params.id);
  let data = null;
  try{
  data = await applicationService.DeleteUser(id);

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
};