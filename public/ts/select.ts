enum Etransaccion {
    na = 'No Aplica',
    venta = 'Venta',
    alquiler = 'Alquiler',
    permuta = 'Permuta',
}

function enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
}

$(document).ready(function() {
    let tableFilter = document.getElementById('selFiltroTransaccion');
    if(tableFilter!=null){
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