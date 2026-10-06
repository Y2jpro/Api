import pool from "../db.js" 


export const getSearchUser = async (search)=>{ 
  
  const data = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id where companies.company_name = $1",[search]);  
  
  return data;
}; 


export const getStausUsers = async (status)=>{ 
  
  const data = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id where applications.status = $1",[status]);   
  
  return data;
};


export const getAllUsers = async ()=>{ 
  
  const data = await pool.query("select * from applications inner join companies on applications.company_id = companies.company_id"); 
  
  return data;
}; 


export const createUser = async (body,company_id)=>{ 
  
  const data = await pool.query("insert into applications(role,status,applied_date,notes,company_id) values($1, $2, $3, $4,$5) returning app_id",[body.role, body.status,body.applied_date,body.notes,company_id]);

  return data;
}

export const updateUsersData = async (body,company_id,id)=>{
 const  data = await pool.query("update applications set role = $1,status = $2,applied_date = $3,notes = $4,company_id = $5 where applications.app_id = $6 returning *",[body.role,body.status,body.applied_date,body.notes,company_id,id]); 
  return data;
} 

export const DeleteUser = async (id)=>{
  
const data = await pool.query("delete from applications where app_id = $1",[id]); 

return data;
}