const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 3000;

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

app.post("/nutzerAuslesen", async (req, res) => {

  const { id } = req.body;
  if(!id) {
    return res.status(400).json({error: "Nutzer ID muss eingegeben werden!"});
  }
  try {

    const result = await db.collection("nutzerColl").findOne({id: id})

    if(result) {
        console.log(1);
        return res.status(201).json({ message: "true" });
    }
    return res.status(201).json({ message: "false" });
  
  } catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    console.log("Interner Test");
    return res.status(500).send("Interner Serverfehler");
  }

});

app.get('/', (req, res) => {
  res.send('nutzerAuslesenMS');
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});