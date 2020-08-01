import Anuncio_Auto from "./clases.js";

let listaAnuncios;
let anuncioSeleccionado = '';

if(localStorage.getItem('anuncios')==null)
{
  localStorage.setItem('anuncios',JSON.stringify(new Array()));
}

$('#btnLimpiar').hide();
$('#btnBorrar').hide();

window.addEventListener("load", function () {
  traerAnuncios();
});

document.getElementById("btnGuardar").addEventListener("click", function (e) {
  e.preventDefault();
  guardarAnuncio();
  actualizarTabla();
});

document.getElementById("btnLimpiar").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("txtTitulo").value = '';
  document.getElementById("selTransaccion").value = '';
  document.getElementById("txtDescipcion").value = '';
  document.getElementById("txtPrecio").value = '';
  document.getElementById("txtPuertas").value = '';
  document.getElementById("txtKms").value = '';
  document.getElementById("txtPotencia").value = '';

  anuncioSeleccionado = '';

  $('#btnLimpiar').hide();
  $('#btnBorrar').hide();
});

document.getElementById("btnBorrar").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("txtTitulo").value = '';
  document.getElementById("selTransaccion").value = '';
  document.getElementById("txtDescipcion").value = '';
  document.getElementById("txtPrecio").value = '';
  document.getElementById("txtPuertas").value = '';
  document.getElementById("txtKms").value = '';
  document.getElementById("txtPotencia").value = '';

  deleteAnuncio();

  $('#btnLimpiar').hide();
  $('#btnBorrar').hide();
});

document.getElementById("selFiltroTransaccion").addEventListener("change", actualizarTabla);
document.getElementById('checkTitulo').addEventListener("change", actualizarTabla);
document.getElementById('checkTransaccion').addEventListener("change", actualizarTabla);
document.getElementById('checkDescripccion').addEventListener("change", actualizarTabla);
document.getElementById('checkDescripccion').addEventListener("change", actualizarTabla);
document.getElementById('checkPrecio').addEventListener("change", actualizarTabla);
document.getElementById('checkPuertas').addEventListener("change", actualizarTabla);
document.getElementById('checkKms').addEventListener("change", actualizarTabla);
document.getElementById('checkPotencia').addEventListener("change", actualizarTabla);

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
  document.getElementById("txtTitulo").value='';
  document.getElementById("selTransaccion").value='';
  document.getElementById("txtDescipcion").value='';
  document.getElementById("txtPrecio").value='';
  document.getElementById("txtPuertas").value='';
  document.getElementById("txtKms").value='';
  document.getElementById("txtPotencia").value='';

  if(anuncioSeleccionado == '')
  {
    enviarAnuncio(anuncioAuto);
  }
  else
  {
    updateAnuncio(anuncioAuto);
  }
}

function generarTabla(list) {

  let lista = filtroMap(list);
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
  calcularPromedioPotencia(lista);
  calcularMaximo(lista);
  calcularMinimo(lista);
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

function calcularPromedioPotencia(lista)
{
  let promedio = lista.reduce((total, anuncio, index, array) => {
    total += parseInt(anuncio.potencia);

    if( index === array.length-1) { 
      return total/array.length;
    }else { 
      return total;
    }
  },0);

  document.getElementById('txtPromedioPotencia').value = promedio;
}

function calcularMaximo(lista){

  let precioMaximo = listaAnuncios.reduce((acc,obj)=>{
    if(obj.precio>acc){acc=obj.precio;}return acc;
  },0);

  document.getElementById('txtPrecioMaximo').value = precioMaximo;
}

function calcularMinimo(lista){

  let precioMinimo = listaAnuncios.reduce((acc,obj)=>{
    if(obj.precio<acc){acc=obj.precio;}return acc;
  },0);

  document.getElementById('txtPrecioMin').value = precioMinimo;
}

function cargarFormulario()
{
  let anuncio = listaAnuncios.find(elemento => elemento.id == this.parentElement.firstChild.innerText);
  console.log(anuncio);
  anuncioSeleccionado=anuncio;

  document.getElementById("txtTitulo").value = anuncio.titulo;
  document.getElementById("selTransaccion").value = anuncio.transaccion;
  document.getElementById("txtDescipcion").value = anuncio.descripcion;
  document.getElementById("txtPrecio").value = anuncio.precio;
  document.getElementById("txtPuertas").value = anuncio.puertas;
  document.getElementById("txtKms").value = anuncio.kms;
  document.getElementById("txtPotencia").value = anuncio.potencia;

  $('#btnLimpiar').show();
  $('#btnBorrar').show();
  
}

function filtroMap(lista){
return lista.map(function(anuncio){
    let anuncioMapeado = new Object()
    anuncioMapeado.id = anuncio.id;
    if(document.getElementById('checkTitulo').checked)
    {
      anuncioMapeado.titulo = anuncio.titulo;
    }
    if(document.getElementById('checkTransaccion').checked)
    {
      anuncioMapeado.transaccion = anuncio.transaccion;
    }
    if(document.getElementById('checkDescripccion').checked)
    {
      anuncioMapeado.descripcion = anuncio.descripcion;
    }
    if(document.getElementById('checkDescripccion').checked)
    {
      anuncioMapeado.descripcion = anuncio.descripcion;
    }
    if(document.getElementById('checkPrecio').checked)
    {
      anuncioMapeado.precio = anuncio.precio;
    }
    if(document.getElementById('checkPuertas').checked)
    {
      anuncioMapeado.puertas = anuncio.puertas;
    }
    if(document.getElementById('checkKms').checked)
    {
      anuncioMapeado.kms = anuncio.kms;
    }
    if(document.getElementById('checkPotencia').checked)
    {
      anuncioMapeado.potencia = anuncio.potencia;
    }
    return anuncioMapeado;
  });
}

//GET Anuncios
function traerAnuncios(){
  //spinner
  $('body').toggleClass('loading');
  setTimeout(()=>{$('body').toggleClass('loading');},2000);


  listaAnuncios = JSON.parse(localStorage.getItem('anuncios'));
  console.log(listaAnuncios);
  generarTabla(listaAnuncios);
}

//ADD anuncio
function enviarAnuncio(anuncioAuto){
  //spinner
  $('body').toggleClass('loading');
  setTimeout(()=>{$('body').toggleClass('loading');},2000);


  let ultimoId = listaAnuncios.reduce((acc,obj)=>{
    if(obj.id>acc){acc=obj.id;}return acc;
  },0);

  anuncioAuto.id=ultimoId+1;
  listaAnuncios.push(anuncioAuto);
  localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
}

function updateAnuncio(anuncioAuto){
  //spinner
  $('body').toggleClass('loading');
  setTimeout(()=>{$('body').toggleClass('loading');},2000);

  anuncioSeleccionado.titulo = anuncioAuto.titulo;
  anuncioSeleccionado.transaccion = anuncioAuto.transaccion;
  anuncioSeleccionado.descripcion = anuncioAuto.descripcion;
  anuncioSeleccionado.precio = anuncioAuto.precio;
  anuncioSeleccionado.puertas = anuncioAuto.puertas;
  anuncioSeleccionado.kms = anuncioAuto.kms;
  anuncioSeleccionado.potencia = anuncioAuto.potencia;

  localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
}

function deleteAnuncio()
{
  //spinner
  $('body').toggleClass('loading');
  setTimeout(()=>{$('body').toggleClass('loading');},2000);
  
  let index = listaAnuncios.indexOf(anuncioSeleccionado);
  if (index > -1) {
    listaAnuncios.splice(index, 1);
  }

  localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
}

function actualizarTabla()
{
  if (document.getElementById("selFiltroTransaccion").value == "na") {
    generarTabla(listaAnuncios);
  } else {
    let listaFiltrada = listaAnuncios.filter((anuncio) => anuncio.transaccion == document.getElementById("selFiltroTransaccion").value);
    generarTabla(listaFiltrada);
  }
}