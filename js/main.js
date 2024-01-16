"use strict";
let rango = document.getElementById("sliderGrupos");
rango.addEventListener("input", valorRango);
let $cantidadGrupos = document.getElementById("cantidadGrupos");
const $form = document.querySelector("form");
$form.addEventListener("submit", crearGrupos);
//Función para determinar el valor del rango del slider
function valorRango(event) {
    $cantidadGrupos.innerHTML = (`<p>Número de grupos: ${rango.value}</p>`);
}
const participantes = [];
//Función para obtener los valores ingresados por el usuario 
function crearGrupos(evento) {
    evento.preventDefault();
    const nuevoGrupo = {
        nombres: $form.participantes.value.split(","),
        cantidadGrupos: parseInt(rango.value),
    };
    participantes.push(nuevoGrupo);
    console.log(participantes);
}
