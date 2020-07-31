import Anuncio_Auto from "./clases.js";

let listaAnuncios;

window.addEventListener("load", function () {
  traerAnuncios();
});

document.getElementById("btnGuardar").addEventListener("click", function (e) {
  e.preventDefault();
  guardarAnuncio();
});

document.getElementById("selFiltroTransaccion").addEventListener("change", function () {
  if (document.getElementById("selFiltroTransaccion").value == "na") {
    generarTabla(listaAnuncios);
  } else {
    let listaFiltrada = listaAnuncios.filter((anuncio) => anuncio.transaccion == document.getElementById("selFiltroTransaccion").value);
    generarTabla(listaFiltrada);
  }
  });

function guardarAnuncio() {
  let anuncioAuto = new Anuncio_Auto(
    document.getElementById("txtTitulo").value,
    document.getElementById("selTransaccion").value,
    document.getElementById("txtDescipcion").value,
    document.getElementById("txtPrecio").value,
    document.getElementById("txtPuertas").value,
    document.getElementById("txtKms").value,
    document.getElementById("txtPotencia").value
  );

  enviarAnuncio(anuncioAuto);
}

function generarTabla(lista) {

  let tabla = document.getElementById("tablaAnuncios");  
  tabla.innerHTML = '';  
  let head = document.createElement("thead");
  head.className = "thead-dark";  

  if(Array.isArray(lista) && lista.length)
  {
    let body = document.createElement("tbody");
    body.className = "table-hover";

    for (const titulo of Object.keys(lista[0]))
    {
      let celdaTitulo = document.createElement("th");
      let textoTitulo = document.createTextNode(titulo);
      celdaTitulo.appendChild(textoTitulo);
      head.appendChild(celdaTitulo);
    }
    for (const anuncioAuto of lista) {
      let fila = document.createElement("tr");
      for (const dato in anuncioAuto) {
        let celda = document.createElement("td");
        celda.addEventListener('click', cargarFormulario);
        let texto = document.createTextNode(anuncioAuto[dato]);
        celda.appendChild(texto);
        fila.appendChild(celda);
      }
      body.appendChild(fila);
    }
    tabla.appendChild(head);
    tabla.appendChild(body);
  }else{
    let celda = document.createElement("th");    
    let texto = document.createTextNode("Nada que ver por aqui");    
    celda.appendChild(texto);
    head.appendChild(celda);
    tabla.appendChild(head);
  }
  calcularPromedio(lista);
}

function calcularPromedio(lista)
{
  let promedio = lista.reduce((total, anuncio, index, array) => {
    total += parseInt(anuncio.precio);

    if( index === array.length-1) { 
      return total/array.length;
    }else { 
      return total;
    }
  },0);

  document.getElementById('txtPromedio').value = promedio;
}

function cargarFormulario()
{
  let anuncio = listaAnuncios.find(elemento => elemento.id == this.parentElement.firstChild.innerText);

  document.getElementById("txtTitulo").value = anuncio.titulo;
  document.getElementById("selTransaccion").value = anuncio.transaccion;
  document.getElementById("txtDescipcion").value = anuncio.descripcion;
  document.getElementById("txtPrecio").value = anuncio.precio;
  document.getElementById("txtPuertas").value = anuncio.puertas;
  document.getElementById("txtKms").value = anuncio.kms;
  document.getElementById("txtPotencia").value = anuncio.potencia;
}

function filtroMap(lista)
{

}

//GET Anuncios
function traerAnuncios() {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      listaAnuncios = JSON.parse(xhr.responseText)["data"];
      generarTabla(listaAnuncios);
      $("body").toggleClass("loading");
    }
  };
  xhr.open("GET", "traer", true);
  xhr.send();
  $("body").toggleClass("loading");
}

//ADD anuncio
function enviarAnuncio(anuncioAuto) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let per = JSON.parse(xhr.responseText);
      document.getElementById("formulario").reset();
      $("body").toggleClass("loading");

      traerAnuncios();
    }
  };
  $("body").toggleClass("loading");
  xhr.open("POST", "alta", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(anuncioAuto));
}

function updateAnuncio(anuncioAuto)
{
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let per = JSON.parse(xhr.responseText);
      document.getElementById("formulario").reset();
      $("body").toggleClass("loading");

      traerAnuncios();
    }
  };
  $("body").toggleClass("loading");
  xhr.open("POST", "modificar", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(anuncioAuto));
}