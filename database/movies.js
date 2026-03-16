const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  port: `3306`,
  password: process.env.APP_PSW,
  database: `movies`,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
