const regionRepositorio = require('../repositorios/region.repositorio');

class RegionControlador {
    
    /**
     * Lista todas las regiones de un país específico
     */
    async listar(req, res) {
        try {
            const { id } = req.params;
            const datos = await regionRepositorio.listar(id);
            res.status(200).json(datos);
        } catch (error) {
            res.status(500).json({ 
                mensaje: "Error obteniendo la lista de regiones",
                error: error.message 
            });
        }
    }

    /**
     * Agrega una nueva región al array de regiones de un país
     */
    async agregar(req, res) {
        try {
            const { id } = req.params;
            const region = req.body;

            // Nota: La validación de contenido ahora debería estar en el Validador (Middleware)
            // pero mantenemos una capa de seguridad aquí.
            if (!region || Object.keys(region).length === 0) {
                return res.status(400).json({ mensaje: "El contenido de la solicitud debe incluir la región" });
            }

            const datos = await regionRepositorio.agregar(id, region);
            res.status(201).json(datos);
        } catch (error) {
            res.status(500).json({ 
                mensaje: "Error agregando región",
                error: error.message 
            });
        }
    }

    /**
     * Modifica los datos de una región existente dentro de un país
     */
    async modificar(req, res) {
        try {
            const { id } = req.params;
            const region = req.body;

            if (!region || !region.nombre) {
                return res.status(400).json({ mensaje: "Debe incluir el nombre de la región a modificar" });
            }

            const datos = await regionRepositorio.modificar(id, region);
            res.status(200).json(datos);
        } catch (error) {
            res.status(500).json({ 
                mensaje: "Error modificando región",
                error: error.message 
            });
        }
    }

    /**
     * Elimina una región por su nombre
     */
    async eliminar(req, res) {
        try {
            const { id, nombre } = req.params;
            const eliminado = await regionRepositorio.eliminar(id, nombre);
            
            if (!eliminado) {
                return res.status(404).json({ mensaje: "Región no encontrada para eliminar" });
            }

            res.status(200).json({ mensaje: "Región eliminada correctamente", nombre });
        } catch (error) {
            res.status(500).json({ 
                mensaje: "Error eliminando región",
                error: error.message 
            });
        }
    }
}

// Exportamos la instancia (Singleton)
module.exports = new RegionControlador();