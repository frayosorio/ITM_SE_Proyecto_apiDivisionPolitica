class CiudadValidador {
    /**
     * Valida la estructura de la ciudad en el body
     */
    validarCuerpo(solicitud, respuesta, next) {
        const { nombre, habitantes, esCapital } = solicitud.body;
        const errores = [];

        if (!nombre || nombre.trim().length < 2) {
            errores.push("El 'nombre' de la ciudad es obligatorio y debe tener al menos 2 caracteres.");
        }

        if (habitantes === undefined || isNaN(habitantes) || habitantes < 0) {
            errores.push("El campo 'habitantes' es obligatorio y debe ser un número positivo.");
        }

        if (esCapital === undefined || typeof esCapital !== 'boolean') {
            errores.push("El campo 'esCapital' es obligatorio y debe ser un valor booleano (true/false).");
        }

        if (errores.length > 0) {
            return respuesta.status(400).json({
                mensaje: "Error de validación en la ciudad",
                detalles: errores
            });
        }
        next();
    }

    /**
     * Valida los parámetros de la URL: ID del país y nombre de la región
     */
    validarParams(solicitud, respuesta, next) {
        const id = parseInt(solicitud.params.id);
        const { region } = solicitud.params;

        if (isNaN(id)) {
            return respuesta.status(400).json({ mensaje: "El ID del país debe ser un número válido." });
        }
        if (!region || region.trim().length === 0) {
            return respuesta.status(400).json({ mensaje: "El nombre de la región es obligatorio en la URL." });
        }
        next();
    }
}

module.exports = new CiudadValidador();