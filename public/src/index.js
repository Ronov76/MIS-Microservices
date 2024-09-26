const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3003;

app.use(express.json());

app.post("/nutzerLoeschen", async (req, res) => {

  const { id } = req.body

  if(!id) {
    return res.status(400).json({error: "ID muss eingegeben werden"})
  }

  const response = await axios.post("http://nutzerloeschen:3002/nutzerloeschen", { id });
  
  return res.status(response.status)

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});