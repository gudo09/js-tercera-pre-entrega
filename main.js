// Importar el archivo JSON
import {habilidadesEN_ES} from "./habilidades.js"
import {pokedexJS} from "./pokedex.js"

let pokedexCompleta = [];
let listaFavoritos = [];

conectarLocalStorage();

/*
  FALTA IMPLEMENTAR:
  ✅- MOSTRAR MENSAJE DE QUE NO SE ENCONTRO NADA CON LA BÚSQUEDA
  ✅- FILTRAR POR ID 
  ✅- BOTON DE FAVORITOS
  - ALMACENAR FAVORITOS EN EL LOCAL STORAGE
  - FILTRAR POR FAVORITOS
  - ORDENAR ALFABETICAMENTE
  - FILTRAR POR TIPOS
  - FILTRAR POR RANGO DE ESTADISTICAS (SOLO PARA PROYECTO FINAL)
  - MOSTRAR POKEMON ALEATORIO (SOLO PARA PROYECTO FINAL)
  - VALIDAR FORMULARIOS
*/




/*
const Pokemon = function (id, nombre, tipos, habilidades, estadisticas) {
  this.id = id,
  this.nombre = nombre,
  this.tipos = tipos,
  this.habilidades = habilidades,
  this.estadisticas = estadisticas;
}

const Estadisticas = function (ps, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad) {
  this.ps = ps,
  this.ataque = ataque,
  this.defensa = defensa,
  this.ataqueEspecial = ataqueEspecial,
  this.defensaEspecial = defensaEspecial,
  this.velocidad = velocidad
}

let pokedexCompleta = [
  new Pokemon( 1, "Bullbasaur", ["Planta", "Veneno"], ["Espesura", undefined, "Clorofila"], new Estadisticas( 45, 49, 49, 65, 65, 45 ) ),
  new Pokemon( 2, "Ivysaur", ["Planta", "Veneno"], ["Espesura", undefined, "Clorofila"], new Estadisticas( 60, 62, 63, 80, 80, 60) ),
  new Pokemon( 3, "Venusaur", ["Planta", "Veneno"], ["Espesura", undefined, "Clorofila"], new Estadisticas( 80, 82, 83, 100, 100, 80) ),
  new Pokemon( 4, "Charmander", ["Fuego", undefined], ["Mar llamas", undefined, "Poder solar"], new Estadisticas( 39, 52, 43, 60, 50, 65) ),

];
console.log(pokedexCompleta)
*/

refrescarPokedex(pokedexCompleta);

//MAQUETO LA BARRA DE HERRAMIENTAS PARA BUSCAR
const divTools = document.querySelector('#tools');
divTools.setAttribute('class', 'py-4 mx-8 flex flex-col');

formularioBuscar();




function conectarLocalStorage(){
  if (localStorage.getItem( 'pokedexCompleta' ) === JSON.stringify(pokedexJS) && localStorage.getItem( 'pokedexCompleta' ) ) {
    pokedexCompleta = JSON.parse( localStorage.getItem('pokedexCompleta' ));
  }else{
    localStorage.removeItem('pokedexCompleta');
    pokedexCompleta = pokedexJS;
    localStorage.setItem( 'pokedexCompleta', JSON.stringify(pokedexCompleta ));
  }


  if (localStorage.getItem('listaFavoritos') !== null) {
    listaFavoritos = JSON.parse(localStorage.getItem('listaFavoritos'));
    console.log(listaFavoritos);
  }
}

function animacionCards(){
  //AÑADO EL EFECTO DE LA LIBRERÍA SCROLL REVEAL A LAS CARDS DE LA POKEDEX
  ScrollReveal().reveal('.card-pokemon', {
    duration: 500,
    reset: true,
    rotate: {y: 50},
    scale: 0.85
  });
}

function capitalize(cadena) {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

function refrescarPokedex(listadoPokedex){
  const pokedexHTML = document.querySelector('#pokedex');
  pokedexHTML.innerHTML = "";

  for (const pokemon of listadoPokedex) {
    //INICIALIZO LA CARD DEL POKEMON
    const card = document.createElement('div');
    card.setAttribute("class","card-pokemon flex flex-col justify-between bg-red-700 p-6 rounded h-[50rem] w-[25rem] text-lg text-white shadow-lg shadow-black");
  
    //PARTE SUPERIOR DE LA CARD DEL POKEMON
    const cardSuperior = document.createElement('div');
    cardSuperior.setAttribute("class","flex justify-between");
  
    cardSuperior.appendChild(maquetarIDPokedex(pokemon));
    cardSuperior.appendChild(maquetarFavoritoCard(pokemon));
    card.appendChild(cardSuperior);

    //PARTE MEDIA DE LA CARD DEL POKEMON
    const cardMedia = document.createElement('div');
    cardMedia.appendChild(maquetarImagenPokedex(pokemon));
    cardMedia.appendChild(maquetarNombrePokedex(pokemon));
    cardMedia.appendChild(maquetarTiposPokedex(pokemon));
    cardMedia.appendChild(maquetarHabilidadesPokedex(pokemon));
    card.appendChild(cardMedia);
  
  
    //PARTE INFERIOR DE LA CARD DEL POKEMON
    const cardInferior = document.createElement('div');
  
    cardInferior.appendChild(maquetarEstadisticasPokedex(pokemon));
  
    
    card.appendChild(cardInferior);
  
  
    //UNO LAS PARTES SUPERIOR E INFERIOR DE LA CARD DEL POKEMON
    pokedexHTML.appendChild(card);
    animacionCards();
  }
};

function indiceDeHabilidad (arreglo, i) {
    return arreglo.indexOf(i) + 1;
}

function getTipos(tipo) {
  switch (tipo) {
    case "bug":
      return {tipo:"bicho", color: "AFBA42"}
    case "dark":
      return {tipo: "siniestro", color: "72564A"}
    case "dragon":
      return {tipo: "dragón", color: "6366AD"}
    case "electric":
      return {tipo: "eléctrico", color: "F7CD55"}
    case "fairy":
      return {tipo: "hada", color: "DAB0D4"}
    case "fighting":
      return {tipo: "lucha", color: "AE5B4B"}
    case "fire":
      return {tipo: "fuego", color: "E95436"}
    case "flying":
      return {tipo: "volador", color: "A4C7ED"}
    case "ghost":
      return {tipo: "fantasma", color: "6A476F"}
    case "grass":
      return {tipo: "planta", color: "8DC266"}
    case "ground":
      return {tipo: "tierra", color: "CFB262"}
    case "ice":
      return {tipo: "hielo", color: "93D5F5"}
    case "normal":
      return {tipo: "normal", color: "B8B9AB"}
    case "poison":
      return {tipo: "veneno", color: "A15B97"}
    case "psychic":
      return {tipo: "psíquico", color: "EC6391"}
    case "rock":
      return {tipo: "roca", color: "B7A86D"}
    case "steel":
      return {tipo: "acero", color: "A4A3B3"}
    case "water":
      return {tipo: "agua", color: "578AC9"}
    default:
      break;
  }
}

function traducirEstadisticasEspanol(estadistica) {
  switch (estadistica) {
    case "hp":
      return "PS"
    case "attack":
      return "ataque"
    case "defense":
      return "defensa"
    case "special-attack":
      return "ataque especial"
    case "special-defense":
      return "defensa especial"
    case "speed":
      return "velocidad"
      default:
        break;
      }
}
    
function formularioBuscar() {

  function buscador(valorBuscado, filtro){
    let resultadoBusqueda = [];
    filtro === "nombre" 
      ? resultadoBusqueda = pokedexCompleta.filter( pokemon => pokemon.name.includes(valorBuscado.toLowerCase().trim()) )
      : resultadoBusqueda = pokedexCompleta.filter( pokemon => pokemon.id === parseInt(valorBuscado.trim()) );
    refrescarPokedex(resultadoBusqueda);
  }

  //CREAR FORMULARIO BUSQUEDA
  const divTools = document.querySelector('#tools');
  
  const formBuscar = document.createElement('form');
  divTools.appendChild(formBuscar);
  formBuscar.setAttribute('class', 'w-3/12 bg-red-700 p-4 border-solid grid grid-cols-4 gap-y-4' );
  //--------------------------------------------PREVENGO EL ENVIO DE DATOS DEL FORMULARIO
  formBuscar.addEventListener('submit', (e) =>{
    e.preventDefault();
  });
  
  //----------------------------------CREO TODOS LOS ELEMENTOS NECESARIOS PARA EL FORMULARIO
  const lblBuscarNombre = document.createElement('label');
  formBuscar.appendChild(lblBuscarNombre);
  const inputBuscarNombre = document.createElement('input');
  formBuscar.appendChild(inputBuscarNombre);
  const lblBuscarID = document.createElement('label');
  formBuscar.appendChild(lblBuscarID);
  const inputBuscarID = document.createElement('input');
  formBuscar.appendChild(inputBuscarID);
  
  //--------------------------------- LABEL Y BOTON BUSCAR POR NOMBRE -------------------------------
  lblBuscarNombre.setAttribute('class', 'text-white font-bold col-span-2');
  lblBuscarNombre.textContent = `Nombre del pokemon`;
  

  inputBuscarNombre.setAttribute('class', 'px-2 py-1 col-span-2 rounded-md');
  
  //--------------------------EVENTO KEYUP PARA MOSTRAR RESULTADOS MIENTRAS SE ESCRIBE--------------------------
  inputBuscarNombre.addEventListener('keyup',(e) => {
    e.preventDefault();
    e.target.value === "" ? refrescarPokedex(pokedexCompleta): buscador(e.target.value, "nombre");
  });

  //--------------------------BLANQUEO EL INPUT ID SI HAGO FOCO--------------------------
  inputBuscarNombre.addEventListener('focus',(e) => {
    inputBuscarID.value = "";
  });


  
  //--------------------------------- LABEL Y BOTON BUSCAR POR ID -------------------------------
  lblBuscarID.setAttribute('class', 'text-white font-bold col-span-2');
  lblBuscarID.textContent = `ID del pokemon`;
  inputBuscarID.setAttribute('class', 'px-2 py-1 col-span-2 rounded-md');
  inputBuscarID.setAttribute("type", "number");
  inputBuscarID.setAttribute("min", 1);
  inputBuscarID.setAttribute("placeholder", "Sólo números");
  inputBuscarID.setAttribute("size", 4);

  //--------------------------REFRESCO CUANTO EL BUSCADOR DEL ID QUEDA EN BLANCO--------------------------
          //-------------------- revisar que no se refresque cuando ya esta vació y se sigue presionando la tecla de borrar
  inputBuscarID.addEventListener('keyup',(e) => {
    e.preventDefault();
    e.target.value === "" ? refrescarPokedex(pokedexCompleta): buscador(e.target.value, "id");
  });

  //--------------------------REFRESCO CON EL EVENTO INPUT, SI SE EXCEDE DE LA CANTIDAD MAXIMA DE LA POKEDEX MUESTRA UN MESAJE--------------------------
  inputBuscarID.addEventListener('input', (e) => {
    document.querySelector('#sinResultados').classList.add('hidden');
    if (e.target.value > pokedexCompleta.length) {
      e.target.value = pokedexCompleta.length;
      document.querySelector('#sinResultados').classList.remove('hidden');
      document.querySelector('#sinResultados').textContent = `La cantidad máxima de la pokedex es de ${pokedexCompleta.length} pokémon actualmente \nY éste es el último pokémon de momento.`;
      buscador(e.target.value, "id");
    }else{
      buscador(e.target.value, "id");
    }
  });

  //--------------------------BLANQUEO EL INPUT NOMBRE SI HAGO FOCO--------------------------
  inputBuscarID.addEventListener('focus',(e) => {
    inputBuscarNombre.value = "";
  });


  /*
  //--------------------------BOTON BUSCAR--------------------------
  const btnBuscar = document.createElement('button')
  formBuscar.appendChild(btnBuscar);
  btnBuscar.setAttribute('type', 'submit');
  btnBuscar.setAttribute('class', 'h-full pl-4 pr-8 text-white font-bold col-span-2	');
  btnBuscar.textContent = 'Buscar';
  */

}

function maquetarImagenPokedex(pokemon) {
  //CREO UNA ETIQUETA <img> QUE CONTENGA LA IMAGEN DE FONDO
  const divImagen = document.createElement('div');
  divImagen.setAttribute("class","flex justify-center bg-[url('./assets/images/pokeball.png')] bg-no-repeat bg-center bg-cover rounded-full aspect-square shadow-2xl mx-16 my-8 shadow-red-950 border-gray-900 border-4");

  //CREO UNA ETIQUETA <img> PARA LA IMAGEN DEL POKEMON
  const imagen = document.createElement('img');
  imagen.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`);
  imagen.setAttribute("class","scale-[1.8] aspect-square my-7 p-2 drop-shadow-lg");
  divImagen.appendChild(imagen);

  return divImagen;
}

function maquetarNombrePokedex(pokemon) {
  //CREO UNA ETIQUETA <div> PARA QUE MUESTRE EL NOMBRE DEL POKEMON
  const pNombre = document.createElement('p');
  pNombre.setAttribute("class", "font-extrabold text-center text-3xl py-2");
  pNombre.textContent = capitalize(pokemon.name);

  return pNombre
}

function maquetarIDPokedex(pokemon) {
  //CREO UNA ETIQUETA <p> PARA EL ID DEL POKEMON
  const numeroPokedex = document.createElement('p');
  numeroPokedex.setAttribute("class","font-extrabold text-2xl drop-shadow-lg");
  numeroPokedex.textContent = `N° pokédex: #${pokemon.id}`;

  return numeroPokedex;
}

function maquetarFavoritoCard(pokemon) {
  const $divFavoritoCard = document.createElement('div');
  $divFavoritoCard.setAttribute("class","");
  
  const $botonFavoritoCard = document.createElement('input');
  $botonFavoritoCard.setAttribute("type","image");
  $botonFavoritoCard.setAttribute("class","bg-white aspect-square w-12 p-2 rounded-full justify-self-end");
  
  !listaFavoritos.some(x => x.id == pokemon.id)
    ? $botonFavoritoCard.src = "./assets/images/heart.svg"
    : $botonFavoritoCard.src = "./assets/images/heart-fill.svg"

  

  $botonFavoritoCard.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(e.target.getAttribute("src"))
    
    if (e.target.getAttribute("src") === "./assets/images/heart.svg") {
      agregarFavorito(pokemon);
      e.target.setAttribute("src","./assets/images/heart-fill.svg");
    } else {
      eliminarFavorito(pokemon);
      e.target.setAttribute("src","./assets/images/heart.svg");
    }
  });
  

  return $botonFavoritoCard;
}

function agregarFavorito(pokemon) {

  if (! listaFavoritos.some(x => x.id === pokemon.id)) {
    listaFavoritos.push(pokemon);
    localStorage.setItem('listaFavoritos', JSON.stringify(listaFavoritos));
    console.log(listaFavoritos);
  }

}

function eliminarFavorito(pokemon) {
  const resultado = listaFavoritos.findIndex(x => x.id === pokemon.id);
  listaFavoritos.splice(resultado,1)

  localStorage.setItem('listaFavoritos', JSON.stringify(listaFavoritos));

  
  console.log(resultado);
  console.log(listaFavoritos);

}

function maquetarTiposPokedex(pokemon) {
  //CREO UNA ETIQUETA <div> PARA QUE MUESTRE LOS TIPOS DEL POKEMON
  const divTipos = document.createElement('div');
  divTipos.setAttribute("class", "flex gap-x-2 mt-4 justify-center");


  for (const type of pokemon.types) {
    //CREO UNA ETIQUETA <p> PARA EL MUESTRE EL TIPO1 DEL POKEMON
    const tipo = document.createElement('div');
    tipo.setAttribute("class", `bg-[#${getTipos(type).color}] rounded-full py-0.5 px-2 w-28 border-4 border-[rgba(27,_23,_23,_50%)]`);
    
    const tipoTexto = document.createElement('p');
    tipoTexto.textContent = capitalize(getTipos(type).tipo.toUpperCase());
    tipoTexto.setAttribute("class", " text-center text-gray-100 align-middle font-extrabold text-base [text-shadow:_2px_1px_0_rgb(0_0_0_/_50%)]");
    tipo.appendChild(tipoTexto);

    divTipos.appendChild(tipo);
  }
  
  return divTipos;
}

function maquetarHabilidadesPokedex(pokemon) {
  //CREO UNA ETIQUETA <div> PARA QUE MUESTRE LAS HABILIDADES DEL POKEMON
  const ulHabilidades = document.createElement('ul');
  ulHabilidades.setAttribute("class", "pt-4");
  for (const h of pokemon.abilities) {
    const liHabilidad = document.createElement('li');
    liHabilidad.setAttribute("class", "flex flex-row gap-x-2 pt-2");

    //CREO UNA ETIQUETA <label> PARA LAS HABILIDADES DEL POKEMON
    const labelHabilidad = document.createElement('label');
    labelHabilidad.setAttribute("class", "font-bold drop-shadow-lg");
    labelHabilidad.textContent = `Habilidad ${indiceDeHabilidad(pokemon.abilities, h)}: `;
    liHabilidad.appendChild(labelHabilidad);
    
    //CREO UNA ETIQUETA <p> PARA EL MOSTRAR LAS HABILIDADES DEL POKEMON
    const habilidad = document.createElement('p');
    habilidad.textContent = traducirHabilidad(h);
    liHabilidad.appendChild(habilidad);

    ulHabilidades.appendChild(liHabilidad);
  }
  return ulHabilidades;
}

function maquetarEstadisticasPokedex(pokemon) {
  const divRespuesta = document.createElement('div');

  //CREO UNA ETIQUETA <p> QUE DIGA ESTADISTICAS
  const labelEstadisticas = document.createElement('p');
  labelEstadisticas.setAttribute("class", "font-bold text-center underline");
  labelEstadisticas.textContent = "Estadísticas";
  divRespuesta.appendChild(labelEstadisticas);
  
  for (const stat of pokemon.stats) {
    //CREO UNA ETIQUETA <div> PARA QUE MUESTRE LAS ESTADISTICAS DEL POKEMON
    const divEstadistica = document.createElement('div');
    divEstadistica.setAttribute("class", "flex gap-x-2 justify-between");

    //CREO UNA ETIQUETA <label> PARA CADA ESTADISTICA DEL POKEMON
    const labelEstadistica = document.createElement('label');
    labelEstadistica.setAttribute("class", "font-bold drop-shadow-lg");
    labelEstadistica.textContent = `${capitalize(traducirEstadisticasEspanol(stat.name))}:`;
    divEstadistica.appendChild(labelEstadistica);
    
    //CREO UNA ETIQUETA <p> PARA EL MOSTRAR CADA ESTADISTICA DEL POKEMON
    const estadistica = document.createElement('p');
    estadistica.textContent = stat.base_stat;

    divEstadistica.appendChild(estadistica);
    divRespuesta.appendChild(divEstadistica);
  }

  return divRespuesta;
}

function traducirHabilidad(ability) {
  const resultado =  habilidadesEN_ES.find( h => h.name === ability).nombre;
  return resultado;
}

