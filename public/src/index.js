const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3003;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});