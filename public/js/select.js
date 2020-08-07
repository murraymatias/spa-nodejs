"use strict";
var Etransaccion;
(function (Etransaccion) {
    Etransaccion["na"] = "No Aplica";
    Etransaccion["venta"] = "Venta";
    Etransaccion["alquiler"] = "Alquiler";
    Etransaccion["permuta"] = "Permuta";
})(Etransaccion || (Etransaccion = {}));
function enumKeys(e) {
    return Object.keys(e);
}
$(document).ready(function () {
    let tableFilter = document.getElementById('selFiltroTransaccion');
    if (tableFilter != null) {
        tableFilter.innerHTML = "";
    }
    for (let key of enumKeys(Etransaccion)) {
        let value = Etransaccion[key];
        let text = document.createTextNode(value);
        let option = document.createElement('option');
        option.value = key;
        option.appendChild(text);
        tableFilter?.appendChild(option);
    }
});
//# sourceMappingURL=select.js.map