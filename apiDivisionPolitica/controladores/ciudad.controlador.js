const ciudadRepositorio = require('../repositorios/ciudad.repositorio');

class CiudadControlador {
    async listar(req, res) {
        try {
            const { id, region } = req.params;
            const datos = await ciudadRepositorio.listar(parseInt(id), region);
            res.status(200).json(datos);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener ciudades", error: error.message });
        }
    }

    async agregar(req, res) {
        try {
            const { id, region } = req.params;
            const ciudad = req.body;
            const datos = await ciudadRepositorio.agregar(parseInt(id), region, ciudad);
            res.status(201).json(datos);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al agregar ciudad", error: error.message });
        }
    }

    async modificar(req, res) {
        try {
            const { id, region } = req.params;
            const ciudad = req.body;
            const datos = await ciudadRepositorio.modificar(parseInt(id), region, ciudad);
            res.status(200).json(datos);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al modificar ciudad", error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            const { id, region, nombreCiudad } = req.params;
            const eliminado = await ciudadRepositorio.eliminar(parseInt(id), region, nombreCiudad);
            
            if (!eliminado) {
                return res.status(404).json({ mensaje: "No se encontró la ciudad para eliminar." });
            }
            res.status(200).json({ mensaje: "Ciudad eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar ciudad", error: error.message });
        }
    }
}

module.exports = new CiudadControlador();