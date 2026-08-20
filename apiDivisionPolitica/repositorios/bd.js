const { MongoClient } = require('mongodb');
const configBD = require('../configuracion/bd.config');

class ConexionBD {
    constructor() {
        this.url = configBD.url;
        this.cliente = new MongoClient(this.url);
        this.db = null;
        this.nombreBD = configBD.BASEDATOS;
    }

    /**
     * Establece la conexión con el servidor de MongoDB
     */
    async conectar() {
        try {
            if (this.db) return this.db; // Si ya existe, no reconectar

            await this.cliente.connect();
            this.db = this.cliente.db(this.nombreBD);
            
            console.log(`Conexión establecida exitosamente a: ${this.nombreBD}`);
            return this.db;
        } catch (error) {
            console.error("Error al conectar a MongoDB:", error.message);
            throw error; // Es vital lanzar el error para que la App no arranque sin BD
        }
    }

    /**
     * Retorna la instancia de la base de datos
     */
    obtenerBD() {
        if (!this.db) {
            throw new Error("Debe llamar a 'conectar()' antes de obtener la base de datos.");
        }
        return this.db;
    }

    /**
     * Cierra la conexión de forma limpia
     */
    async cerrar() {
        await this.cliente.close();
        this.db = null;
        console.log("🔌 Conexión a MongoDB cerrada.");
    }
}

// Exportamos una única instancia (Singleton)
module.exports = new ConexionBD();