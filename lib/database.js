// lib/database.js
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
        
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "bkctb_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query({ query: sql, values = [] }) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}

export default db;