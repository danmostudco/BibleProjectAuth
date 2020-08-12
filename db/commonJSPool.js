// import { Pool } from "pg";
const { Pool } = require("pg");

//import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

// export default pool;
module.exports = pool;
