import mysql from "mysql2/promise";

export const db = await mysql.createConnection(process.env.DATABSE_URL_MYSQL!);
