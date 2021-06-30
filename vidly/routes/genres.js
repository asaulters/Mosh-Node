const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, genre: "action" },
  { id: 2, genre: "comedy" },
  { id: 3, genre: "horror" },
  { id: 4, genre: "suspense" },
];

router.get("/", (req, res) => {
  res.send("Hello world!!!");
});
router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  //validating name input
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = {
    id: genre.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genres);
});

router.put("/:id", (req, res) => {
  //lookup course with id
  //if course doesn't exist, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given id was not found");

  //validate
  //if invalid return 400error - bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  //update course
  genre.name = req.body.name;
  //return updated course to client
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  //lookup course
  //not exist - 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given id was not found");

  //delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
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
