const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  if (!genre)
    return res.status(404).send("the genre with the given ID can not be found");
  res.send(genre);
});

router.post("/", async (req, res) => {
  //validating name input
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("Genre with the given id was not found");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findByIdAndRemove(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  //delete

  //return same course
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;

// async function createGenre(newGenre) {
//   const genre = new Genre({
//     name: newGenre,
//   });
//   try {
//     await genre.save();
//   } catch (ex) {
//     for (field in ex.errors) console.log(ex.errors[field].message);
//   }
// }

// async function getGenres() {
//   const genres = await Genre.find().sort({ name: 1 }).select({ name: 1 });
//   console.log(genres);
// }

// async function updateGenre(id, newGenre) {
//   const result = await Genre.findByIdAndUpdate(id);
//   if (!result)
//     return res.status(404).send("Genre with the given id was not found");
//   result.set({
//     name: newGenre,
//   });
//   const resultGenre = await result.save();
//   // console.log(resultGenre);
// }

// async function removeGenre(id) {
//   const genre = await Genre.findByIdAndRemove(id);
//   console.log(genre);
// }

// createGenre("romance");
// updateGenre("60e41928f29e1e25a89da921", "action");

// const genres = [
//   { id: 1, genre: "action" },
//   { id: 2, genre: "comedy" },
//   { id: 3, genre: "horror" },
//   { id: 4, genre: "suspense" },
// ];

// router.put("/:id", (req, res) => {
//   //lookup course with id
//   //if course doesn't exist, return 404
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("Genre with the given id was not found");

//   //validate
//   //if invalid return 400error - bad request
//   const { error } = validateGenre(req.body);
//   if (error) return res.status(400).send(result.error.details[0].message);

//   //update course
//   genre.name = req.body.name;
//   //return updated course to client
//   res.send(genre);
// });

// router.delete("/:id", (req, res) => {
//   //lookup course
//   //not exist - 404
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("Genre with the given id was not found");

//   //delete
//   const index = genres.indexOf(genre);
//   genres.splice(index, 1);
//   //return same course
//   res.send(genre);
// });

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };

//   return Joi.validate(genre, schema);
// }

// module.exports = router;
