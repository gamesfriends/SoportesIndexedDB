"use strict";

const statusBar = document.getElementById("statusBar-text");

const dateSupInput = document.getElementById("dateSup");
const clientInput = document.getElementById("client");
const serialNumberInput = document.getElementById("serialNumber");
const supportNumberInput = document.getElementById("supportNumber");


const IDBRequest = indexedDB.open("soportes", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    const db = IDBRequest.result;
    db.createObjectStore("soportes", {
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", () => {
    statusBar.innerHTML = "Base de datos abierta correctamente";
});

IDBRequest.addEventListener("error", () => {
    statusBar.innerHTML = "Se produjo un error al intentar abrir la base de datos";
});

document.getElementById("btnNew").addEventListener("click", () => {
    dateSupInput.disabled = false;
    clientInput.disabled = false;
    serialNumberInput.disabled = false;
    supportNumberInput.disabled = false;
    statusBar.innerHTML = "Cargando nuevo registro";
});

document.getElementById("btnCreate").addEventListener("click", () => {
    let dateSup = document.getElementById("dateSup").value;
    let client = document.getElementById("client").value;
    let serialNumber = document.getElementById("serialNumber").value;
    let supportNumber = document.getElementById("supportNumber").value;

    if (dateSup.length > 0) {
        if (document.querySelector(".posible") != undefined) {
            if (confirm("Hay elementos sin guardar: ¿Desea continuar?")) {
                addObjeto({
                    dateSup: dateSup,
                    client: client,
                    serialNumber: serialNumber,
                    supportNumber: supportNumber
                });
                statusBar.innerHTML = "Registro agregado correctamente";
            }
        } else {
            addObjeto({
                dateSup: dateSup,
                client: client,
                serialNumber: serialNumber,
                supportNumber: supportNumber
            });
            statusBar.innerHTML = "Registro agregado correctamente";
        }
        dateSupInput.disabled = true;
        clientInput.disabled = true;
        serialNumberInput.disabled = true;
        supportNumberInput.disabled = true;
    }
    document.getElementById("dateSup").value = "";
    document.getElementById("client").value = "";
    document.getElementById("serialNumber").value = "";
    document.getElementById("supportNumber").value = "";
});

const addObjeto = objeto => {
    const IDBData = getIDBdata("readwrite");
    IDBData[0].add(objeto);
    IDBData[1].addEventListener("complete", () => {
        console.log("Objeto agregado correctamente");
    });
};

const getIDBdata = mode => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("soportes", mode);
    const objectStore = IDBTransaction.objectStore("soportes");
    return [objectStore, IDBTransaction];
};
