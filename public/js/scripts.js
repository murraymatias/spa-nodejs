import Anuncio_Auto from "./clases.js";

let listaAnuncios;

window.addEventListener('load', function () {
    traerAnuncios();
    generarTabla();
});

document.getElementById("btnGuardar").addEventListener("click", function(e) {
    e.preventDefault();
    guardarAnuncio();
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

function enviarAnuncio(anuncioAuto) {

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
      let per = JSON.parse(xhr.responseText);
      document.getElementById("formulario").reset();
    }
  };

  xhr.open("POST", "alta", true);
  xhr.setRequestHeader("Content-Type", "Application/JSON");
  xhr.send(JSON.stringify(anuncioAuto));
}

function generarTabla() {

    let tabla = document.getElementById("tablaAnuncios");

    for (const anuncioAuto of listaAnuncios) {

      let fila = document.createElement("tr");
      for (const dato in anuncioAuto) {
        let celda = document.createElement("td");
        //celda.addEventListener('click', cargarFormulario);      
        let texto = document.createTextNode(anuncioAuto[dato]);
        celda.appendChild(texto);
        fila.appendChild(celda);  
        
      }
      tabla.appendChild(fila);
    }
}

function traerAnuncios() {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText)["data"]);

         listaAnuncios = JSON.parse(xhr.responseText)["data"];

         generarTabla();
      }
    };
    xhr.open("GET", "traer", true);
    xhr.send();
}
