const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

class SwaggerConfig {
    constructor() {
        this.puerto = process.env.PORT || 3030;
        this.options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'API División Política',
                    version: '1.0.0',
                    description: 'Microservicio orientado a objetos para gestionar geografía',
                },
                servers: [
                    {
                        url: `http://localhost:${this.puerto}`,
                        description: 'Servidor Local de Pruebas'
                    },
                ],
            },
            // Asegúrate de que esta ruta coincida con tus archivos de rutas actuales
            apis: ['./src/rutas/*.js', './rutas/*.js'], 
        };
        this.spec = swaggerJsDoc(this.options);
    }

    /**
     * Configura Swagger en la aplicación Express recibida
     * @param {express.Application} app 
     */
    configurar(app) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.spec));
        console.log(`📖 Documentación Swagger disponible en: http://localhost:${this.puerto}/api-docs`);
    }
}

module.exports = new SwaggerConfig();