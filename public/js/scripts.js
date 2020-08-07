import Anuncio_Auto from "./classes.js";

//#region Elementos
let listaAnuncios;
let anuncioSeleccionado = '';
let formControls = [$('#txtTitulo'),$('#selTransaccion'),$('#txtDescipcion'),$('#txtPrecio'),$('#txtPuertas'),$('#txtKms'),$('#txtPotencia')];
let checkBoxes = [$('#checkTitulo'),$('#checkTransaccion'),$('#checkDescripccion'),$('#checkDescripccion'),$('#checkPrecio'),$('#checkPuertas'),$('#checkKms'),$('#checkPotencia')];
//#endregion

console.log(localStorage);

//#region LocalStorage Init
if(localStorage.getItem('anuncios')==null){
  localStorage.setItem('anuncios',JSON.stringify(new Array()));
}

for(const box of checkBoxes){
  if(localStorage.getItem(box.val())==null){
    localStorage.setItem(box.val(),'true');
  }
}
//#endregion

// console.log(localStorage);

//#region Events handlers initialization
$(document).ready(function () {
  traerAnuncios();
  for(const box of checkBoxes){
    console.log(localStorage.getItem(box.val()));

    if(localStorage.getItem(box.val())=='true'){
      box.prop("checked",true);
    }else{
      box.prop("checked",false);
    }
  }
});


//Save button handler
$("#btnGuardar").click(function (e) {
  e.preventDefault();
  guardarAnuncio();
  actualizarTabla();
});

//Clean button handeler
$("#btnLimpiar").click(function (e) {
  e.preventDefault();
  for (const control of formControls){
    control.val('');
  }

  anuncioSeleccionado = '';
  actualizarTabla();

  $('#btnLimpiar').hide();
  $('#btnBorrar').hide();
});

//Delete button handler
$("#btnBorrar").click(function (e) {
  e.preventDefault();
  for (const control of formControls){
    control.val('');
  }

  deleteAnuncio();
  actualizarTabla();

  $('#btnLimpiar').hide();
  $('#btnBorrar').hide();
});

for (const box of checkBoxes){
  box.change(function () {
    actualizarTabla();
    guardarChecks();
  });
}

$("#selFiltroTransaccion").change(actualizarTabla);
//#endregion


$('#btnLimpiar').hide();
$('#btnBorrar').hide();

function guardarAnuncio() {
  let anuncioAuto = new Anuncio_Auto(
    $("#txtTitulo").val(),
    $("#selTransaccion").val(),
    $("#txtDescipcion").val(),
    $("#txtPrecio").val(),
    $("#txtPuertas").val(),
    $("#txtKms").val(),
    $("#txtPotencia").val()
  );

  for (const control of formControls){
    control.val('');
  }

  if(anuncioSeleccionado == ''){
    enviarAnuncio(anuncioAuto);
  }
  else{
    updateAnuncio(anuncioAuto);
  }
}

function guardarChecks()
{
  for (const box of checkBoxes){
    if(box.prop('checked')){
      localStorage.setItem(box.val(),'true');
    }else{
      localStorage.setItem(box.val(),'false');
    }
  }
}
//#region Table operations
function actualizarTabla()
{
  if ($("#selFiltroTransaccion").val() == "na") {
    generarTabla(listaAnuncios);
  } else {
    let listaFiltrada = listaAnuncios.filter((anuncio) => anuncio.transaccion == $("#selFiltroTransaccion").val());
    generarTabla(listaFiltrada);
  }
}

function generarTabla(list) {

  calcularPromedio(list);
  calcularPromedioPotencia(list);
  calcularMaximo(list);
  calcularMinimo(list);
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
}
//#endregion

//#region Statistics
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

  $('#txtPromedio').val(promedio);
}

function calcularPromedioPotencia(lista)
{
  let promedio = lista.reduce((total, anuncio, index, array) => {
    total += parseInt(anuncio.potencia);

    if( index === array.length-1){ 
      return total/array.length;
    }else{
      return total;
    }
  },0);
  $('#txtPromedioPotencia').val(promedio);
}

function calcularMaximo(lista){
  let precioMaximo = listaAnuncios.reduce((acc,obj)=>{
    if(obj.precio>acc){acc=obj.precio;}return acc;
  },0);
  $('#txtPrecioMaximo').val(precioMaximo);
}

function calcularMinimo(lista){
  let precioMinimo = listaAnuncios.reduce((acc,obj)=>{
    if(obj.precio<acc){acc=obj.precio;}return acc;
  },0);
  $('#txtPrecioMin').val(precioMinimo);
}
//#endregion

function cargarFormulario()
{
  let anuncio = listaAnuncios.find(elemento => elemento.id == this.parentElement.firstChild.innerText);
  anuncioSeleccionado=anuncio;

  $("#txtTitulo").val(anuncio.titulo);
  $("#selTransaccion").val(anuncio.transaccion);
  $("#txtDescipcion").val(anuncio.descripcion);
  $("#txtPrecio").val(anuncio.precio);
  $("#txtPuertas").val(anuncio.puertas);
  $("#txtKms").val(anuncio.kms);
  $("#txtPotencia").val(anuncio.potencia);

  $('#btnLimpiar').show();
  $('#btnBorrar').show();
}

function filtroMap(lista){
  return lista.map(function(anuncio){
    let anuncioMapeado = new Object()
    anuncioMapeado.id = anuncio.id;

    if(document.getElementById('checkTitulo').checked){
      anuncioMapeado.titulo = anuncio.titulo;
    }
    if(document.getElementById('checkTransaccion').checked){
      anuncioMapeado.transaccion = anuncio.transaccion;
    }
    if(document.getElementById('checkDescripccion').checked){
      anuncioMapeado.descripcion = anuncio.descripcion;
    }
    if(document.getElementById('checkDescripccion').checked){
      anuncioMapeado.descripcion = anuncio.descripcion;
    }
    if(document.getElementById('checkPrecio').checked){
      anuncioMapeado.precio = anuncio.precio;
    }
    if(document.getElementById('checkPuertas').checked){
      anuncioMapeado.puertas = anuncio.puertas;
    }
    if(document.getElementById('checkKms').checked){
      anuncioMapeado.kms = anuncio.kms;
    }
    if(document.getElementById('checkPotencia').checked){
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
  generarTabla(listaAnuncios);
}

//ADD Anuncio
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

//UPDATE Anuncio
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

//DELETE Anuncio
function deleteAnuncio()
{
  //spinner
  $('body').toggleClass('loading');
  setTimeout(()=>{$('body').toggleClass('loading');},2000);
  
  let index = listaAnuncios.indexOf(anuncioSeleccionado);
  listaAnuncios.splice(index,1);

  localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
}