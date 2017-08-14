"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Handling database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err)
    throw err;
  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  app.use("/tweets", tweetsRoutes);
  });
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});