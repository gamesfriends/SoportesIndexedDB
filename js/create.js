"use strict";

const statusBar = document.getElementById("statusBar-text");
const dateSupInput = document.getElementById("dateSup");
const clientInput = document.getElementById("client");
const serialNumberInput = document.getElementById("serialNumber");
const supportNumberInput = document.getElementById("supportNumber");
const orderNumber = document.getElementById("orderNumber");
const typeOfJob = document.getElementById("typeOfJob");
const observations = document.getElementById("observations");
const finalized = document.getElementById("finalized");

const IDBRequest = indexedDB.open("soportes", 1);

function activeNoActive (active) {
    if (active) {
        dateSupInput.classList.replace("field-frame-noActive", "field-frame-active");
        clientInput.classList.replace("field-frame-noActive", "field-frame-active");
        serialNumberInput.classList.replace("field-frame-noActive", "field-frame-active");
        supportNumberInput.classList.replace("field-frame-noActive", "field-frame-active");
        orderNumber.classList.replace("field-frame-noActive", "field-frame-active");
        typeOfJob.classList.replace("field-frame-noActive", "field-frame-active");
        observations.classList.replace("field-frame-noActive", "field-frame-active");
        finalized.classList.replace("field-frame-noActive", "field-frame-active");

        dateSupInput.disabled = false;
        clientInput.disabled = false;
        serialNumberInput.disabled = false;
        supportNumberInput.disabled = false;
        orderNumber.disabled = false;
        typeOfJob.disabled = false;
        observations.disabled = false;
        finalized.disabled = false;
    } else {
        dateSupInput.classList.replace("field-frame-active", "field-frame-noActive");
        clientInput.classList.replace("field-frame-active", "field-frame-noActive");
        serialNumberInput.classList.replace("field-frame-active", "field-frame-noActive");
        supportNumberInput.classList.replace("field-frame-active", "field-frame-noActive");
        orderNumber.classList.replace("field-frame-active", "field-frame-noActive");
        typeOfJob.classList.replace("field-frame-active", "field-frame-noActive");
        observations.classList.replace("field-frame-active", "field-frame-noActive");
        finalized.classList.replace("field-frame-active", "field-frame-noActive");

        dateSupInput.disabled = true;
        clientInput.disabled = true;
        serialNumberInput.disabled = true;
        supportNumberInput.disabled = true;
        orderNumber.disabled = true;
        typeOfJob.disabled = true;
        observations.disabled = true;
        finalized.disabled = true;

        dateSupInput.value = "";
        clientInput.value = "";
        serialNumberInput.value = "";
        supportNumberInput.value = "";
        orderNumber.value = "";
        typeOfJob.value = "";
        observations.value = "";
        finalized.value = "";
        }
}


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

    activeNoActive(true);

    statusBar.innerHTML = "Cargando nuevo registro";
});

document.getElementById("btnCreate").addEventListener("click", () => {
    let dateSup = dateSupInput.value;
    let client = clientInput.value;
    let serialNumber = serialNumberInput.value;
    let supportNumber = supportNumberInput.value;

    //let dateSup = document.getElementById("dateSup").value;
    //let client = document.getElementById("client").value;
    //let serialNumber = document.getElementById("serialNumber").value;
    //let supportNumber = document.getElementById("supportNumber").value;

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
    }
    activeNoActive(false);
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
