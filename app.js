const express = require("express");
const app = express();
const port = 3000;
const url = "http://localhost:";
const connection = require("./database/movies");

//^ MIDDLEWARES

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  const filmsSQL = `SELECT * FROM movies.movies`;
  connection.query(filmsSQL, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      success: true,
      results: results,
    });
  });

  //   res.json({
  //     success: true,
  //     results: results,
  //   });
});

app.listen(port, () => {
  console.log(`Server online on ${url}${port}`);
});
