"use strict";


const tableToFill = document.querySelector('.tableData');
const supportFields = ["ID", "DATE", "CLIENT", "SERIE", "SUPPORT", "ORDER", "TYPE OF JOB", "FINALIZED", "TIME", "WATCH"];

var fragment = `<tr class="tableData-row">`;
for (const posField in supportFields) {
    fragment += `<th class="tableData-th${posField} borderRow tableThsH">${supportFields[posField]}</th>`;
}
fragment += `</tr>`;

const IDBRequest = indexedDB.open("soportes", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    const db = IDBRequest.result;
    db.createObjectStore("soportes", {
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", () => {
    leerObjetos();
});

IDBRequest.addEventListener("error", () => {
    console.log("Ocurrio un error al abrir o crear la base de datos");
});

const leerObjetos = () => {
    const IDBData = getIDBdata("readonly");
    const cursor = IDBData[0].openCursor();
    cursor.addEventListener("success", () => {
        if (cursor.result) {
            armaTabla(cursor.result.key, cursor.result.value);
            cursor.result.continue();
        } else {
            tableToFill.innerHTML = fragment
            console.log(fragment);
        }
        
    });
};

const getIDBdata = mode => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("soportes", mode);
    const objectStore = IDBTransaction.objectStore("soportes");
    return [objectStore, IDBTransaction];
};

const armaTabla = (id, table) => {
    //console.log(table);
    fragment += `
        <tr class="tableData-row">
            <td class="tabledata-cell borderRow center">${id}</td>
            <td class="tabledata-cell borderRow center">${table.dateSup}</td>
            <td class="tabledata-cell borderRow center">${table.client}</td>
            <td class="tabledata-cell borderRow center">${table.serialNumber}</td>
            <td class="tabledata-cell borderRow center">${table.supportNumber}</td>
            <td class="tabledata-cell borderRow center">${table.orderNumber}</td>
            <td class="tabledata-cell borderRow center">${table.typeOfJob}</td>
            <td class="tabledata-cell borderRow center">${table.observations}</td>
            <td class="tabledata-cell borderRow center">${table.statusSupport}</td>
            <td class="tabledata-cell borderRow center"><a href="url.html#sop=${id}">...</a></td>
        </tr>
    `;
};