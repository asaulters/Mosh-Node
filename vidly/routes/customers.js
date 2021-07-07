const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: boolean,
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: number,
  })
);

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  if (!customer) return res.status(404).send("the customer can not be found");
  res.send(customer);
});

router.post("/", async (req, res) => {
  // validating name
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id");
