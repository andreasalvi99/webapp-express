const express = require("express");
const router = express.Router();
const mooviesController = require("../controllers/moviesController");

router.get("/", mooviesController.index);
router.get("/:id", mooviesController.show);

module.exports = router;
