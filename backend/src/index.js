require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes");
const { default: mongoose } = require("mongoose");
const PORT = 3333;

app.use(cors("*"));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.NODE_ENV !== "PROD" ? "dev-db" : "prod-db",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", api);


app.listen(process.env.PORT || PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});
