const $body = document.querySelector("body")!,
  $sidebar = $body.querySelector(".sidebar")!,
  $toggle = $body.querySelector(".toggle")!,
  $searchBtn = $body.querySelector(".search-box")!,
  $modeSwitch = $body.querySelector(".toggle-switch")!,
  $modeText = $body.querySelector(".mode-text")!;

$toggle.addEventListener("click", () => {
  $sidebar.classList.toggle("close");
});

$modeSwitch.addEventListener("click", () => {
  $body.classList.toggle("dark");
  if ($body.classList.contains("dark")) {
    $modeText.innerHTML = "Light Mode";
  } else {
    $modeText.innerHTML = "Dark Mode";
  }
});

let rango = document.getElementById("sliderGrupos") as HTMLFormElement;
rango.addEventListener("input", valorRango);
let $cantidadGrupos = document.getElementById(
  "cantidadGrupos"
) as HTMLFormElement;
const $form = document.querySelector("form") as HTMLFormElement;
$form.addEventListener("submit", crearGrupos);
$form.numeroGrupos.addEventListener("input", valorRango2);

//Función para determinar el valor del rango del slider e igualarlo al input tipo number
function valorRango(event: Event) {
  $form.numeroGrupos.value = rango.value;
}
function valorRango2(event: Event) {
  rango.value = $form.numeroGrupos.value;
}

interface Participantes {
  nombres: string[];
  cantidadGrupos: number;
}

let participantes: Participantes[] = [];

//Función para obtener los valores ingresados por el usuario
function crearGrupos(evento: Event): void {
  evento.preventDefault();
  const nuevoGrupo: Participantes = {
    nombres: $form.participantes.value.split(","),
    cantidadGrupos: parseInt(rango.value),
  };

  if (nuevoGrupo.cantidadGrupos >= nuevoGrupo.nombres.length) {
    alert("nope");
  } else if (nuevoGrupo.cantidadGrupos <= 1) {
    alert("nope");
  } else {
    participantes = [];
    participantes.push(nuevoGrupo);
    mostrarGrupo();
  }
}

function mezclarArray(array: string[]): string[] {
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
function agruparNombres(grupos: Participantes[]): string[][] {
  // Se mezclan los nombres del primer grupo utilizando la función mezclarArray construida antes.
  const nombresMezclados = mezclarArray([...grupos[0].nombres]);
  // Se inicializa un arreglo vacío para almacenar los nombres agrupados
  const gruposAgrupados: string[][] = [];
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

function mostrarGrupo(): void {
  const $mostrarGrupos = document.getElementById("mostrarGrupos");

  if ($mostrarGrupos) {
    $mostrarGrupos.innerHTML = "";

    const gruposAleatorios = agruparNombres(participantes);

    for (let i = 0; i < gruposAleatorios.length; i++) {
      $mostrarGrupos.innerHTML += `<div class="cardGroup">
      <div class="cardHeader">Grupo: ${i + 1}</div>
      <ul class="list-group list-group-flush">
        <li class="listGroupItem">
          Integrantes: ${gruposAleatorios[i].join(", ")}
          
        </li>
      </ul>
    </div>`;
    }
  }
}

/* Establezca el ancho de la Sidebar en 200px */
function openNav(): void {
  document.getElementById("sidebar")!.style.width = "200px";
}

/* Establezca el ancho de la Sidebar en 0 */
function closeNav(): void {
  document.getElementById("sidebar")!.style.width = "0";
}
