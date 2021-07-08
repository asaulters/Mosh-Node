const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer"); //.Customer

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.post("/", async (req, res) => {
  // validating name
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.errror.details[0].message);
  // find and update
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!customer)
    return res.status(404).send("Customer with the given id was not found");

  res.send(customer);
});

router.delete("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.errror.details[0].message);
  const customer = await Customer.findByIdAndRemove(req.params.id, {
    name: req.body.name,
  });

  //delete

  //return same customer
  res.send(customer);
});

module.exports = router;
