const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3002;

app.use(express.json());

// MongoDB-URL aus den Umgebungsvariablen
const mongoUrl = process.env.MONGO_URL;

// MongoDB-Client initialisieren
let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db("nutzerDB");
    console.log("Mit MongoDB 'nutzerDB' verbunden!");
  } catch (error) {
    console.error("Fehler bei der Verbindung zu MongoDB 'nutzerDB':", error);
  }
}

connectToMongo();

app.post("/nutzerLoeschen", async (req, res) => {

  const { id, name, alter } = req.body;
  if(!id) {
    return res.status(400).json({error: "Nutzer ID muss eingegeben werden!"});
  }

  try {
    const response = await axios.post("http://nutzerauslesen:3000/nutzerauslesen", { id });
    const message = response.data.message;

    if(message === "false") {
        console.log(1);
        return res.status(404).json({ statusBool: "false", message: "Nutzer wurde nicht geloescht!" });
    }
    
    const result = await db.collection("nutzerDB").deleteOne({id: id});
    return res.status(201).json({statusBool: "true", message: "Nutzer wurde geloescht"});
  
  } catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }

});

app.get('/', (req, res) => {
  res.send('nutzerLoeschenMS');
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});