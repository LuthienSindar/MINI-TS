"use strict";
let rango = document.getElementById("customRange3");
rango.addEventListener("input", valorRango);
let tamaño = document.getElementById("tamaño");


function valorRango(event) {
    tamaño.innerHTML = `<p>Número de grupos: ${rango.value}</p>`;
}
