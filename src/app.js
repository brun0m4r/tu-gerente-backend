require("dotenv").config();
const express = require("express");
const { conn } = require("./db");
const models = require("./routes/models");
const { CORS_URL } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "qonda" });
});

app.use("/empresas", models);

let port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("listen in port", port);
  });
});
