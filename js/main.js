"use strict";
let rango = document.getElementById("sliderGrupos");
rango.addEventListener("input", valorRango);
let $cantidadGrupos = document.getElementById("cantidadGrupos");
const $form = document.querySelector("form");
$form.addEventListener("submit", crearGrupos);
$form.numeroGrupos.addEventListener("input", valorRango2);
//Función para determinar el valor del rango del slider e igualarlo al input tipo number
function valorRango(event) {
    $form.numeroGrupos.value = rango.value;
}
function valorRango2(event) {
    rango.value = $form.numeroGrupos.value;
}
const participantes = [];
//Función para obtener los valores ingresados por el usuario
function crearGrupos(evento) {
    evento.preventDefault();
    const nuevoGrupo = {
        nombres: $form.participantes.value.split(","),
        cantidadGrupos: parseInt(rango.value),
    };
    //Condicional para avisar si hay más grupos que participantes
    if (nuevoGrupo.cantidadGrupos > nuevoGrupo.nombres.length) {
        alert("nope");
    }
    else {
        participantes.push(nuevoGrupo);
        agruparNombres(participantes);
    }
    // Llama a la función para imprimir los grupos en el HTML
    imprimirGrupos(gruposGenerados);
}
function mezclarArray(array) {
    //Se recorre el arreglo de derecha a izquierda, desde el último elemento hasta el primero
    for (let i = array.length - 1; i > 0; i--) {
        //creamos un índice j que es aleatorio usando math que sea de rango de 0 a i
        const j = Math.floor(Math.random() * (i + 1));
        // mezclamos los elementos segun el indice usando destructuracion (para no tener que hacer una variable temporal)
        [array[i], array[j]] = [array[j], array[i]];
    }
    // retornamos un nuevo arreglo mezclado
    return array;
}
// La función agruparNombres toma un arreglo de objetos 'Participantes' y crea los grupos segun lo que quiere el usuario y les va poniendo
// los nombres que mezclamos en orden del idice de los grupos que se crearon, nos retorna una lista de listas de nombres.
function agruparNombres(grupos) {
    // Se mezclan los nombres del primer grupo utilizando la función mezclarArray construida antes.
    const nombresMezclados = mezclarArray([...grupos[0].nombres]);
    // Se inicializa un arreglo vacío para almacenar los nombres agrupados
    const gruposAgrupados = [];
    // Se crea un bucle que recorrerá el número de grupos especificados en el input del usuario
    for (let i = 0; i < grupos[0].cantidadGrupos; i++) {
        // crea un grupo vacio por cada recorrido del bicle (esta creando los grupos que necesitamos segun lo que el usuario necesita)
        gruposAgrupados.push([]);
    }
    // se crea una variable index = 0 para saber a que grupo se le asignaran los nombres mezclados
    let index = 0;
    // Se realiza un bucle a través de los nombres mezclados
    for (const nombre of nombresMezclados) {
        // Se agrega el nombre al grupo actual en el que se encuentra el índice
        gruposAgrupados[index].push(nombre);
        // Se actualiza el índice para pasar al siguiente grupo y hacemos que index vuelva al principio si supera el número total de grupos,
        // lo que permite una distribución cíclica de los nombres entre los grupos. en resumen vuelve al primer grupo y mete otro nombre :p
        index = (index + 1) % grupos[0].cantidadGrupos;
    }
    console.log(gruposAgrupados);
    // retornamos los grupos agrupados
    return gruposAgrupados;
}
function mostrarGrupo() {
    const $mostrarGrupo = document.getElementById("mostrarGrupo");
    let contenidoHtml = ``;
    //gruposAgrupados.forEach((grupo) => {});
}
mostrarGrupo();
// Función para imprimir los grupos en el HTML
function imprimirGrupos(grupos) {
    // Obtén el elemento HTML donde deseas mostrar los grupos
    const resultadoContainer = document.getElementById("resultado");
    // Reinicia el contenido para evitar duplicados
    resultadoContainer.innerHTML = "";
    // Itera sobre cada grupo
    grupos.forEach((grupo, indice) => {
        // Crea un nuevo elemento div para representar el grupo
        const grupoDiv = document.createElement("div");
        grupoDiv.classList.add("grupo"); // Puedes agregar clases CSS para darle estilo a los grupos si lo deseas
        // Itera sobre los nombres dentro del grupo
        grupo.forEach((nombre) => {
            // Crea un elemento de párrafo para cada nombre y agrégalo al grupoDiv
            const nombreParrafo = document.createElement("p");
            nombreParrafo.textContent = nombre;
            grupoDiv.appendChild(nombreParrafo);
        });
        // Agrega el grupoDiv al contenedor principal
        resultadoContainer.appendChild(grupoDiv);
    });
}
