const express = require("express");
const app = express();
const port = 3000;
const url = "http://localhost:";
const moviesRouter = require("./routers/moviesRouter");

//^ MIDDLEWARES

app.use(express.static("public"));
app.use(express.json());

//^ ROUTES
app.use("/movies", moviesRouter);

//^ NOT FOUND, SERVER ERROR

const errorHandlers = require("./middlewares/errors");

app.use(errorHandlers.error404);
app.use(errorHandlers.error500);

app.listen(port, () => {
  console.log(`Server online on ${url}${port}`);
});
