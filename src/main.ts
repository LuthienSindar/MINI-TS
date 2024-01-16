
let rango = document.getElementById("sliderGrupos") as HTMLFormElement;
rango.addEventListener("input", valorRango);
let $cantidadGrupos = document.getElementById("cantidadGrupos") as HTMLFormElement;
const $form = document.querySelector("form") as HTMLFormElement;
$form.addEventListener("submit", crearGrupos)


//Función para determinar el valor del rango del slider
function valorRango(event:Event) {
    $cantidadGrupos.innerHTML = (`<p>Número de grupos: ${rango.value}</p>`);
}

interface Participantes {
    nombres: string[];
    cantidadGrupos: number;
}

const participantes: Participantes [] = []

//Función para obtener los valores ingresados por el usuario 
function crearGrupos(evento: Event): void {
    evento.preventDefault();
    const nuevoGrupo: Participantes = {
        nombres: $form.participantes.value.split(","),
        cantidadGrupos: parseInt(rango.value),
    };
    participantes.push(nuevoGrupo)
    console.log(participantes)
}