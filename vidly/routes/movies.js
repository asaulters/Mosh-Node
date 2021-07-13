const { Movie, validate } = require("../models/movie");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const movie = await Movie.find().sort("title");
  if (!genre)
    return res.status(404).send("the movie with the given ID can not be found");
  res.send(movie);
});

router.post("/", async (req, res) => {
  //validating name input
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre!");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { genre: req.body.genre },
    { numberInStock: req.body.numberInStock },
    { dailyRentalRate: req.body.dailyRentalRate }
  );

  if (!movie)
    return res.status(404).send("Movie with the given id was not found");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const movie = await Movie.findByIdAndRemove(
    req.params.id,
    { title: req.body.title },
    { genre: req.body.genre },
    { numberInStock: req.body.numberInStock },
    { dailyRentalRate: req.body.dailyRentalRate }
  );
  //return same course
  res.send(movie);
});

module.exports = router;
