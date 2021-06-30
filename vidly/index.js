const Joi = require("joi");
const express = require("express");
const genres = require("./routes/genres");
const app = express();

app.use(express.json());
app.use("/api/genres", genres); //for anything that starts with 1st param use second param path
// app.use("/", home); //for anything that starts with 1st param use second param path

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
