const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan"); //http logger
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// config
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  //validating name input
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //lookup course with id
  //if course doesn't exist, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with the given id was not found");

  //validate
  //if invalid return 400error - bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  //update course
  course.name = req.body.name;
  //return updated course to client
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //lookup course
  //not exist - 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with the given id was not found");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //return same course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// api/courses/1
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course witht he given id was not found");
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
