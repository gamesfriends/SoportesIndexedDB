"use strict";

const statusBar = document.getElementById("statusBar-text");
const IDBRequest = indexedDB.open("soportes", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    const db = IDBRequest.result;
    db.createObjectStore("soportes", {
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", () => {
    statusBar.innerHTML = "Base de datos creada correctamente";
});

IDBRequest.addEventListener("error", () => {
    statusBar.innerHTML = "Se produjo un error al crear la base de datos";
});