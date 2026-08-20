class PaisValidador {
    
    /**
     * Valida la estructura mínima para crear o modificar
     */
    validarCuerpo(solicitud, respuesta, next) {
        const { id, nombre, continente } = solicitud.body;
        const errores = [];

        if (!id) errores.push("El campo 'id' es obligatorio.");
        if (!nombre || nombre.trim().length < 2) errores.push("El 'nombre' debe tener al menos 2 caracteres.");
        if (!continente) errores.push("El campo 'continente' es obligatorio.");

        if (errores.length > 0) {
            return respuesta.status(400).json({
                mensaje: "Error de validación",
                detalles: errores
            });
        }

        next(); // Todo legal, pasamos al siguiente paso (el controlador)
    }

    /**
     * Valida que los parámetros de URL sean correctos
     */
    validarIdParam(solicitud, respuesta, next) {
        const id = parseInt(solicitud.params.id);
        if (isNaN(id)) {
            return respuesta.status(400).json({
                mensaje: "El ID proporcionado en la URL debe ser un número válido."
            });
        }
        next();
    }
}

module.exports = new PaisValidador();