const express = require('express');
const conexionBD = require('./repositorios/bd');
const paisRutas = require('./rutas/pais.rutas');
const regionRutas = require('./rutas/region.rutas');
const ciudadRutas = require('./rutas/ciudad.rutas');
const swaggerConfig = require('./configuracion/swagger');

class App {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 3000;

        this._conectarBaseDatos();
        this._configurarMiddlewares();
        this._configurarDocumentacion();
        this._configurarRutas();
        this._configurarManejoErrores();
    }

    _configurarDocumentacion() {
        swaggerConfig.configurar(this.app);
    }

    async _conectarBaseDatos() {
        try {
            await conexionBD.conectar();
        } catch (error) {
            console.error("Fallo crítico: No se pudo iniciar la base de datos.");
            process.exit(1);
        }
    }

    _configurarMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // Aquí podrías agregar CORS, Helmet, Morgan, etc.
    }

    _configurarRutas() {
        // Ruta base de prueba
        this.app.get('/', (req, res) => res.json({ estado: "Online" }));

        // Rutas de la API
        this.app.use('/api/paises', paisRutas);
        this.app.use('/api/paises', regionRutas);
        this.app.use('/api/paises', ciudadRutas);
    }

    _configurarManejoErrores() {
        // Middleware global para capturar errores 404 o 500
        this.app.use((req, res) => {
            res.status(404).json({ mensaje: "Ruta no encontrada" });
        });
    }

    escuchar() {
        this.app.listen(this.puerto, () => {
            console.log(`API División Política corriendo en: http://localhost:${this.puerto}`);
        });
    }
}

// Exportamos la instancia para iniciarla en el punto de entrada (server.js o index.js)
module.exports = new App();


