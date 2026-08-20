/**
 * Configuración de Base de Datos
 * Soporta configuración local y entornos de contenedores (Docker)
 */
module.exports = {
    // CAMBIO: Usar '127.0.0.1' en lugar de 'mongo' como respaldo local
    SERVIDOR: process.env.DB_HOST || 'mongo', 
    PUERTO: process.env.DB_PORT || '27017',
    BASEDATOS: process.env.DB_NAME || 'divisionpolitica',
    USUARIO: process.env.DB_USER || '',
    CLAVE: process.env.DB_PASS || '',
    
    get url() {
        const auth = this.USUARIO && this.CLAVE ? `${this.USUARIO}:${this.CLAVE}@` : '';
        return `mongodb://${auth}${this.SERVIDOR}:${this.PUERTO}`;
    }
}