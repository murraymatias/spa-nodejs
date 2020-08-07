export default class DataAccess {
    /**
     * traer
     */
    public static traer() {
        return localStorage.getItem('anuncios');
    }
    /**
     * insertsar
     */
    public static insertsar(listaAnuncios: any) {
        localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
    }
    /**
     * borrar
     */
    public static borrar(listaAnuncios: any) {
        localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
    }
    /**
     * modificar
     */
    
    public static modificar(listaAnuncios: any) {
        localStorage.setItem('anuncios',JSON.stringify(listaAnuncios));
    }
}