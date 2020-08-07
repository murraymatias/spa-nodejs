export default class DataAccess {
    /**
     * traer
     */
    static traer() {
        return localStorage.getItem('anuncios');
    }
    /**
     * insertsar
     */
    static insertsar(listaAnuncios) {
        localStorage.setItem('anuncios', JSON.stringify(listaAnuncios));
    }
    /**
     * borrar
     */
    static borrar(listaAnuncios) {
        localStorage.setItem('anuncios', JSON.stringify(listaAnuncios));
    }
    /**
     * modificar
     */
    static modificar(listaAnuncios) {
        localStorage.setItem('anuncios', JSON.stringify(listaAnuncios));
    }
}
//# sourceMappingURL=DataAccess.js.map