import express from "express";
import fs from "fs";

const insurance_dataJSON = fs.readFileSync(
  "./data/insurance_data.json",
  "utf-8"
);
const insurance_data = JSON.parse(insurance_dataJSON);
let Router = express.Router();

Router.get("/:id", (req, res) => {
  try {
    let getCustomerById = insurance_data.customers.find((customer) => {
      return customer.id === Number(req.params.id);
    });
    res.json({
      status: req.statusCode,
      payload: getCustomerById,
    });
  } catch (error) {
    res.json({ status: req.statusCode, payload: "error" });
  }
});

Router.get("/", (req, res) => {
  try {
    res.json({ status: req.statusCode, payload: insurance_data });
  } catch (error) {
    res.json({ status: req.statusCode, payload: "error" });
  }
});

Router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;
  try {
    // Read existing data from file

    // Find the customer with the given ID and update their data
    const customerIndex = insurance_data.customers.findIndex(
      (customer) => customer.id === id
    );
    if (customerIndex === -1) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    insurance_data.customers[customerIndex] = {
      ...insurance_data.customers[customerIndex],
      ...newData,
    };
    // Write updated data back to the file
    fs.writeFileSync(
      "data/insurance_data.json",
      JSON.stringify(insurance_data, null, 2),
      "utf-8"
    );
    // console.log(insurance_data);
    console.log(insurance_data.customers[customerIndex]);
    res.json({ status: 200, payload: insurance_data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.post("/", (req, res) => {
  try {
    // Add the new customer to the list of customers
    const newCustomer = req.body;
    insurance_data.customers.push(newCustomer);

    // Write the updated insurance data to the file
    fs.writeFileSync(
      "data/insurance_data.json",
      JSON.stringify(insurance_data, null, 2)
    );

    res.json({ status: 200, message: "Customer added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ status: 500, message: "Error adding customer" });
  }
});

export default Router;
