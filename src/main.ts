//Variables
let d = document;
//Obetener la etiqueta form como tipo elemento form del HTML
let $form = d.querySelector("form") as HTMLFormElement;
//escuchar el boton para generar los grupos
$form.addEventListener("submit", crearGrupos);
//creamos un arreglo vacío que va a contener objetos de la interface participante
const participantes: InterfaceParticipante[] = [];
//Escuchamos el valor del rango
$form.rangoGrupos.addEventListener("input", rangoValue);
$form.cantidadGrupos.addEventListener("input", rangoValue2);
// Interfaces empizas con mayusculas
interface InterfaceParticipante {
  nombres: string[];
  cantidadGrupos: number;
}

//Funciones
//función para generar los grupos cada que undimos el boton crear
function crearGrupos(e: Event) {
  e.preventDefault(); //evitar el comportamiento por defecto que recarga la pag
  //objeto del tipo que cumpla con la estructura, en este caso Participante
  const nuevoParticipantes: InterfaceParticipante = {
    nombres: $form.participantes.value.split(","), //método split con coma para crear un array
    cantidadGrupos: $form.grupos.value,
  };
  if ($form.cantidadGrupos.value > nuevoParticipantes.nombres.length) {
    alert("nope");
  }
  participantes.push(nuevoParticipantes);
}
console.log(participantes);

//función que pinta la cantidad de grupos según el range
function rangoValue(e: Event) {
  $form.cantidadGrupos.value = $form.range.value;
}
function rangoValue2(e: Event) {
  $form.range.value = $form.cantidadGrupos.value;
}

//Ejecuciones
