const connection = require("../database/movies");

function index(req, res) {
  const filmsSQL = `SELECT * FROM movies.movies`;
  connection.query(filmsSQL, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      success: true,
      results: results,
    });
  });
}

function show(req, res) {
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
      film.image = pathCrafter(film.image);
      res.json({
        success: true,
        results: film,
      });
    });
  });
}

module.exports = { index, show };

function pathCrafter(image) {
  return `${process.env.APP_URL}:${process.env.APP_PORT}/img/${image}`;
}
