class Anuncio{
    id: number;
    titulo: string;
    transaccion: string;
    descripcion: string;
    precio: number;

    constructor(titulo:string,transaccion:string,descripcion:string,precio:number){
        this.id=0;
        this.titulo=titulo;
        this.transaccion=transaccion;
        this.descripcion=descripcion;
        this.precio=precio;
    }    
}

export default class Anuncio_Auto extends Anuncio{
    puertas: number;
    kms: number;
    potencia: number;

    constructor(titulo:string,transaccion:string,descripcion:string,precio:number,puertas:number,kms:number,potencia:number){
        super(titulo,transaccion,descripcion,precio);
        this.puertas=puertas;
        this.kms=kms;
        this.potencia=potencia;
    }
}
