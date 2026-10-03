import pg from "pg";
import "dotenv/config";


const {Pool} = pg;

const pool = new Pool({ 
    user:process.env.DB_USER,
    host:process.env.DB_HOST,    database:process.env.DATABASE,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT
}); 

pool.query("SELECT NOW()")
  .then(result => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch(error => {
    console.error("Database connection failed:", error);
  });






export default pool;
/*
user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database:process.env.DATABASE,
    password: process.env.DB_PASS,
    port: process.env.PORT
    */