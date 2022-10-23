const express = require("express");
const { start } = require("./bot");
require("dotenv").config();

const PORT = process.env.PORT || 3030;
const app = express();

app.listen(PORT, start);
