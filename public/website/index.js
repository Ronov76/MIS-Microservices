
function nutzerErstellen() {
    waiting();

    const id = parseInt(document.getElementById("txtID").value, 10);
    const name = document.getElementById("txtName").value;
    const alter = parseInt(document.getElementById("txtAlter").value, 10);

    fetch("http://localhost:3003/nutzerErstellen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            alter: alter
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("status").textContent = "Nutzer wurde erfolgreich erstellt";
            return response.json();
        } else {
            document.getElementById("status").textContent = "Fehlschlag bei der Erstellung";
            return response.json();
        }
    })
    .catch(error => {
        console.error("Fehler: ", error);
        document.getElementById("status").textContent = "Fehlschlag bei der Erstellung";
    })

    clear();

}

function nutzerLoeschen() {
    waiting();

    const id = parseInt(document.getElementById("txtID").value, 10);

    fetch("http://localhost:3003/nutzerloeschen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("status").textContent = "Nutzer wurde erfolgreich geloscht";
            return response.json();
        } else {
            document.getElementById("status").textContent = "Fehlschlag bei der Loeschung";
            return response.json();
        }
    })
    .catch(error => {
        console.error("Fehler: ", error);
        document.getElementById("status").textContent = "Fehlschlag bei der Loeschung.";
    })  

    clear();

}




function clear(){
    document.getElementById("txtID").value = 0
    document.getElementById("txtName").value = ""
    document.getElementById("txtAlter").value = 0
}

function waiting() {
    document.getElementById("status").textContent = "In Bearbeitung"
}