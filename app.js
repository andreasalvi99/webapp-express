const express = require("express");
const app = express();
const port = 3000;
const url = "http://localhost:";
const connection = require("./database/movies");

//^ MIDDLEWARES

app.use(express.static("public"));
app.use(express.json());

//^ ROUTES

app.get("/", (req, res) => {
  const filmsSQL = `SELECT * FROM movies.movies`;
  connection.query(filmsSQL, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      success: true,
      results: results,
    });
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  //^ Query per indicare il film

  const filmSQL = `SELECT * FROM movies.movies WHERE id = ?`;
  connection.query(filmSQL, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    const film = results[0];

    //^ Query per avere le reviews

    const reviewSQL = `SELECT * FROM movies.reviews WHERE movie_id = ?`;
    connection.query(reviewSQL, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Databasequery failed" });
      film.reviews = results;
      res.json({
        success: true,
        results: film,
      });
    });
  });
});

//^ NOT FOUND, SERVER ERROR

const errorHandlers = require("./middlewares/errors");

app.use(errorHandlers.error404);
app.use(errorHandlers.error500);

app.listen(port, () => {
  console.log(`Server online on ${url}${port}`);
});
