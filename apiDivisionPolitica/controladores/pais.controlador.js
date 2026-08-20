const paisRepositorio = require('../repositorios/pais.repositorio');

class PaisControlador {

    async listar(solicitud, respuesta) {
        try {
            const datos = await paisRepositorio.listar();
            return respuesta.json(datos);
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error obteniendo la lista de países"
            });
        }
    }

    async agregar(solicitud, respuesta) {
        try {
            const nuevoPais = await paisRepositorio.agregar(solicitud.body);
            return respuesta.status(201).json(nuevoPais);
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error agregando país"
            });
        }
    }

    async modificar(solicitud, respuesta) {
        try {
            // Ya no validamos aquí, el middleware ya lo hizo por nosotros
            const datos = await paisRepositorio.modificar(solicitud.body);
            return respuesta.json(datos);
        } catch (error) {
            return respuesta.status(500).json({ mensaje: "Error modificando país" });
        }
    }

    async eliminar({ params }, respuesta) { // Desestructuramos params de la solicitud
        try {
            const { id } = params;
            const exito = await paisRepositorio.eliminar(id);

            if (!exito) {
                return respuesta.status(404).json({
                    mensaje: "País no encontrado para eliminar"
                });
            }

            return respuesta.json({
                mensaje: "País eliminado correctamente",
                exito: true
            });
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error eliminando país"
            });
        }
    }

    async capital(solicitud, respuesta) {
        try {
            const dato = await paisRepositorio.obtenerCapital(solicitud.params.pais);
            if (!dato) {
                return respuesta.status(404).json({ mensaje: "No se encontró la capital para ese país" });
            }
            return respuesta.json(dato);
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error obteniendo la capital del país"
            });
        }
    }
}

module.exports = new PaisControlador();