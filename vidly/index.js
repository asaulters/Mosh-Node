const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Oh no... Could not connect to MongoDB", err));

app.use(express.json());
app.use("/api/genres", genres); //for anything that starts with 1st param use second param path
app.use("/api/customers", customers);
app.use("/api/movies", movies); //for anything that starts with 1st param use second param path
// app.use("/", home); //for anything that starts with 1st param use second param path

// customers.post({ name: "Adam" }, { isGold: true }, { phone: 123456 });

// genres.router.post({ name: "Action" });

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
