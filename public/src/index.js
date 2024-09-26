const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../website")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});

app.post("/nutzerErstellen", async (req, res) => {

  const { id, name, alter } = req.body

  if(!id) {
    return res.status(400).json({error: "ID muss eingegeben werden"})
  }
  if(!name) {
    return res.status(400).json({error: "Name muss eingegeben werden!"});
  }
  if(!alter) {
    return res.status(400).json({error: "Alter muss eingegeben werden!"});
  }

  try{
    
    const response = await axios.post("http://nutzerloeschen:3001/nutzererstellen", { id });
    const message = response.data.message;

    if(message === "statusBool") {
      return res.status(200).json({ message: "Nutzer konnte nicht erstellt werden!"})
    }

  } catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }

  return res.status(200).json({ message: "Nutzer erfolgreich erstellt"});

});

app.post("/nutzerLoeschen", async (req, res) => {

  const { id } = req.body
  
  console.log(req.body);

  if(!id) {
    return res.status(400).json({error: "ID muss eingegeben werden"})
  }

  try{
    
    const response = await axios.post("http://nutzerloeschen:3002/nutzerloeschen", { id });
    const message = response.data.message;

    if(message === "statusBool") {
      return res.status(200).json({ message: "Nutzer konnte nicht geloescht werden!"})
    }

  } catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }

  return res.status(200).json({ message: "Nutzer erfolgreich gelöscht"});

});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

