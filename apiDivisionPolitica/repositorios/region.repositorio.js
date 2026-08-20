const bd = require('./bd');


class RegionRepositorio {
    constructor() {
        this.collectionName = 'paises';
    }

    /**
     * Getter para obtener la colección de forma limpia.
     * Ya no necesitamos validar aquí si la BD existe, 
     * pues la App no arranca si la conexión falla.
     */
    get _collection() {
        return bd.obtenerBD().collection(this.collectionName);
    }

    async listar(idPais) {
        try {
            // Ya no usamos parseInt aquí porque el Validador 
            // garantiza que idPais llega listo para usar.
            const pipeline = [
                { $match: { id: parseInt(idPais) } }, 
                {
                    $project: {
                        _id: 0,
                        'regiones.nombre': 1,
                        'regiones.area': 1,
                        'regiones.poblacion': 1,
                    }
                }
            ];
            const resultado = await this._collection.aggregate(pipeline).toArray();
            return resultado.length > 0 ? (resultado[0].regiones || []) : [];
        } catch (error) {
            this._handleError('listar', error);
        }
    }

    async agregar(idPais, region) {
        try {
            // El objeto 'region' ya viene validado (trae nombre, area, poblacion)
            const resultado = await this._collection.updateOne(
                { id: parseInt(idPais) },
                {
                    $push: {
                        regiones: {
                            ...region,
                            ciudades: [] 
                        }
                    }
                }
            );
            
            if (resultado.matchedCount === 0) throw new Error('El país no existe');
            return region;
        } catch (error) {
            this._handleError('agregar', error);
        }
    }

    async modificar(idPais, region) {
        try {
            const resultado = await this._collection.updateOne(
                {
                    id: parseInt(idPais),
                    "regiones.nombre": region.nombre 
                },
                {
                    $set: {
                        'regiones.$.area': region.area,
                        'regiones.$.poblacion': region.poblacion,
                    }
                }
            );

            if (resultado.matchedCount === 0) throw new Error('No se encontró la región para modificar');
            return region;
        } catch (error) {
            this._handleError('modificar', error);
        }
    }

    async eliminar(idPais, nombreRegion) {
        try {
            const resultado = await this._collection.updateOne(
                { id: parseInt(idPais) },
                {
                    $pull: {
                        regiones: { nombre: nombreRegion }
                    }
                }
            );
            return resultado.modifiedCount > 0;
        } catch (error) {
            this._handleError('eliminar', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`❌ Error en RegionRepositorio.${metodo}:`, error.message);
        throw error;
    }
}

module.exports = new RegionRepositorio();