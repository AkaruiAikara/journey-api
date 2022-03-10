require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const router = require("./src/routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", router);
app.use(express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
