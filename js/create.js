"use strict";

const statusBar = document.getElementById("statusBar-text");
const dateSupInput = document.getElementById("dateSup");
const clientInput = document.getElementById("client");
const serialNumberInput = document.getElementById("serialNumber");
const supportNumberInput = document.getElementById("supportNumber");
const orderNumberInput = document.getElementById("orderNumber");
const typeOfJobInput = document.getElementById("typeOfJob");
const observationsInput = document.getElementById("observations");
const statusSupportInput = document.getElementById("statusSupport");

const IDBRequest = indexedDB.open("soportes", 1);

function activeNoActive (active) {
    if (active) {
        dateSupInput.classList.replace("field-frame-noActive", "field-frame-active");
        clientInput.classList.replace("field-frame-noActive", "field-frame-active");
        serialNumberInput.classList.replace("field-frame-noActive", "field-frame-active");
        supportNumberInput.classList.replace("field-frame-noActive", "field-frame-active");
        orderNumberInput.classList.replace("field-frame-noActive", "field-frame-active");
        typeOfJobInput.classList.replace("field-frame-noActive", "field-frame-active");
        observationsInput.classList.replace("field-frame-noActive", "field-frame-active");
        statusSupportInput.classList.replace("field-frame-noActive", "field-frame-active");

        dateSupInput.disabled = false;
        clientInput.disabled = false;
        serialNumberInput.disabled = false;
        supportNumberInput.disabled = false;
        orderNumberInput.disabled = false;
        typeOfJobInput.disabled = false;
        observationsInput.disabled = false;
        statusSupportInput.disabled = false;
    } else {
        dateSupInput.classList.replace("field-frame-active", "field-frame-noActive");
        clientInput.classList.replace("field-frame-active", "field-frame-noActive");
        serialNumberInput.classList.replace("field-frame-active", "field-frame-noActive");
        supportNumberInput.classList.replace("field-frame-active", "field-frame-noActive");
        orderNumberInput.classList.replace("field-frame-active", "field-frame-noActive");
        typeOfJobInput.classList.replace("field-frame-active", "field-frame-noActive");
        observationsInput.classList.replace("field-frame-active", "field-frame-noActive");
        statusSupportInput.classList.replace("field-frame-active", "field-frame-noActive");

        dateSupInput.disabled = true;
        clientInput.disabled = true;
        serialNumberInput.disabled = true;
        supportNumberInput.disabled = true;
        orderNumberInput.disabled = true;
        typeOfJobInput.disabled = true;
        observationsInput.disabled = true;
        statusSupportInput.disabled = true;

        dateSupInput.value = "";
        clientInput.value = "";
        serialNumberInput.value = "";
        supportNumberInput.value = "";
        orderNumberInput.value = "";
        typeOfJobInput.value = "";
        observationsInput.value = "";
        statusSupportInput.value = "";
    }
};

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
    let dateSupCreate = dateSupInput.value;
    let clientCreate = clientInput.value;
    let serialNumberCreate = serialNumberInput.value;
    let supportNumberCreate = supportNumberInput.value;
    let orderNumberCreate = orderNumberInput.value;
    let typeOfJobCreate = typeOfJobInput.value;
    let observationsCreate = observationsInput.value;
    let statusSupportCreate = statusSupportInput.value;

    if (dateSupCreate.length > 0) {
        addObjeto({
            dateSup: dateSupCreate,
            client: clientCreate,
            serialNumber: serialNumberCreate,
            supportNumber: supportNumberCreate,
            orderNumber: orderNumberCreate,
            typeOfJob: typeOfJobCreate,
            observations: observationsCreate,
            statusSupport: statusSupportCreate
        });
    }
    statusBar.innerHTML = "Registro agregado correctamente";
    activeNoActive(false);
});

const addObjeto = objeto => {
    const IDBData = getIDBdata("readwrite");
    IDBData[0].add(objeto);
    IDBData[1].addEventListener("complete", () => {
        //console.log("Objeto agregado correctamente");
    });
};

const getIDBdata = mode => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("soportes", mode);
    const objectStore = IDBTransaction.objectStore("soportes");
    return [objectStore, IDBTransaction];
};
