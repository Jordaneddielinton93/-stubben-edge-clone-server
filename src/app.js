import express from "express";
import cors from "cors";

import InsuranceRoute from "../routes/insuranceRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

app.use("/insurance", InsuranceRoute);

export default app;
