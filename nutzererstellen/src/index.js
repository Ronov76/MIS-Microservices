const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;

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

app.post("/nutzerErstellen", async (req, res) => {

  const { id, name, alter } = req.body;
  if(!id) {
    return res.status(400).json({error: "Nutzer ID muss eingegeben werden!"});
  }
  if(!name) {
    return res.status(400).json({error: "Name muss eingegeben werden!"});
  }
  if(!alter) {
    return res.status(400).json({error: "Alter muss eingegeben werden!"});
  }

  try {
    const response = await axios.post("http://nutzerauslesen:3000/nutzerauslesen", { id });
    const message = response.data.message;

    if(message === "true") {
        console.log(1);
        return res.status(404).json({ message: "Bereits vorhanden!" });
    }
    
    const result = await db.collection("nutzerDB").insertOne({nutzerID, name, alter});
    return res.status(201).json({message: "Nutzer wurde erstellt"});
  
  } catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }

});

app.get('/', (req, res) => {
  res.send('nutzerErstellenMS');
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});