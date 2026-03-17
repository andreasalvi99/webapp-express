const express = require("express");
const app = express();
const moviesRouter = require("./routers/moviesRouter");
const cors = require("cors");

//^ MIDDLEWARES

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//^ ROUTES
app.use("/movies", moviesRouter);

//^ NOT FOUND, SERVER ERROR

const errorHandlers = require("./middlewares/errors");

app.use(errorHandlers.error404);
app.use(errorHandlers.error500);

app.listen(`${process.env.APP_PORT}`, () => {
  console.log(`Server online on ${process.env.APP_URL}${process.env.APP_PORT}`);
});
