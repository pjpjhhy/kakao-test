import mysql from "mysql2";

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// DB CONNECT
// 커넥션, 풀에 담가두는 방식
const db = mysql.createPool(config).promise();    

export default db;