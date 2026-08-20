const bd = require('./bd');

class CiudadRepositorio {
    constructor() {
        this.collectionName = 'paises';
    }

    get _collection() {
        return bd.obtenerBD().collection(this.collectionName);
    }

    /**
     * Lista ciudades usando $unwind para aplanar el array de regiones
     * y filtrar la región específica.
     */
    async listar(idPais, nombreRegion) {
        try {
            const pipeline = [
                { $match: { id: idPais } },
                { $unwind: "$regiones" },
                { $match: { "regiones.nombre": nombreRegion } },
                { $project: { _id: 0, ciudades: "$regiones.ciudades" } }
            ];
            
            const resultado = await this._collection.aggregate(pipeline).toArray();
            // Retorna el array de ciudades o un array vacío si no hay coincidencias
            return resultado.length > 0 ? (resultado[0].ciudades || []) : [];
        } catch (error) {
            this._handleError('listar', error);
        }
    }

    /**
     * Agrega una ciudad al array de una región específica dentro de un país.
     */
    async agregar(idPais, nombreRegion, ciudad) {
        try {
            const resultado = await this._collection.updateOne(
                { id: idPais, "regiones.nombre": nombreRegion },
                {
                    $push: { "regiones.$.ciudades": ciudad }
                }
            );

            if (resultado.matchedCount === 0) throw new Error('País o Región no encontrada');
            return ciudad;
        } catch (error) {
            this._handleError('agregar', error);
        }
    }

    /**
     * Modifica una ciudad usando arrayFilters para identificar 
     * exactamente qué región y qué ciudad actualizar.
     */
    async modificar(idPais, nombreRegion, ciudad) {
        try {
            const resultado = await this._collection.updateOne(
                { id: idPais },
                {
                    $set: {
                        "regiones.$[reg].ciudades.$[ciu].habitantes": ciudad.habitantes,
                        "regiones.$[reg].ciudades.$[ciu].esCapital": ciudad.esCapital
                    }
                },
                {
                    arrayFilters: [
                        { "reg.nombre": nombreRegion },
                        { "ciu.nombre": ciudad.nombre }
                    ]
                }
            );

            if (resultado.matchedCount === 0) throw new Error('No se pudo actualizar la ciudad');
            return ciudad;
        } catch (error) {
            this._handleError('modificar', error);
        }
    }

    /**
     * Elimina una ciudad del array de ciudades de la región.
     */
    async eliminar(idPais, nombreRegion, nombreCiudad) {
        try {
            const resultado = await this._collection.updateOne(
                { id: idPais, "regiones.nombre": nombreRegion },
                {
                    $pull: { "regiones.$.ciudades": { nombre: nombreCiudad } }
                }
            );
            return resultado.modifiedCount > 0;
        } catch (error) {
            this._handleError('eliminar', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en CiudadRepositorio.${metodo}:`, error.message);
        throw error;
    }
}

module.exports = new CiudadRepositorio();