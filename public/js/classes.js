class Anuncio {
    constructor(titulo, transaccion, descripcion, precio) {
        this.id = 0;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
export default class Anuncio_Auto extends Anuncio {
    constructor(titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
        super(titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}
//# sourceMappingURL=classes.js.map