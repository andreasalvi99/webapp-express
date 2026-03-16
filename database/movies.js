const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.APP_HOST,
  user: process.env.APP_USER,
  port: process.env.APP_PORT,
  password: process.env.APP_PSW,
  database: process.env.APP_DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
