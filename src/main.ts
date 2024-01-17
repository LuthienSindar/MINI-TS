
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
}

console.log(participantes)

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

