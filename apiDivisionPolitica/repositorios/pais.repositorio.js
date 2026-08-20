const bd = require('./bd');

class PaisRepositorio {
    constructor() {
        this.collectionName = 'paises';
    }

    /**
     * Helper privado para obtener la colección
     */
    get _collection() {
        const basedatos = bd.obtenerBD();
        return basedatos.collection(this.collectionName);
    }

    async listar() {
        try {
            return await this._collection
                .find()
                .project({
                    id: 1, nombre: 1, continente: 1,
                    tipoRegion: 1, codigoAlfa2: 1, codigoAlfa3: 1
                })
                .toArray();
        } catch (error) {
            this._handleError('listar', error);
        }
    }

    async agregar(pais) {
        try {
            await this._collection.insertOne({
                id: pais.id,
                nombre: pais.nombre,
                tipoRegion: pais.tipoRegion,
                continente: pais.continente,
                codigoAlfa2: pais.codigoAlfa2,
                codigoAlfa3: pais.codigoAlfa3
            });
            return pais;
        } catch (error) {
            this._handleError('agregar', error);
        }
    }

    async modificar(pais) {
        try {
            const filtro = { id: Number(pais.id) };
            const resultado = await this._collection.updateOne(
                filtro,
                { $set: { ...pais } } // Operador spread para simplificar si los campos coinciden
            );

            if (resultado.matchedCount === 0) throw new Error('País no encontrado');
            return pais;
        } catch (error) {
            this._handleError('modificar', error);
        }
    }

    async eliminar(idPais) {
        try {
            const resultado = await this._collection.deleteOne({ id: parseInt(idPais) });
            return resultado.deletedCount > 0;
        } catch (error) {
            this._handleError('eliminar', error);
        }
    }

    async obtenerCapital(nombrePais) {
        try {
            const pipeline = [
                { $match: { nombre: nombrePais } },
                { $unwind: '$regiones' },
                { $unwind: '$regiones.ciudades' },
                { $match: { "regiones.ciudades.capitalPais": true } },
                {
                    $project: {
                        _id: 0,
                        ciudad: '$regiones.ciudades.nombre',
                        estado: '$regiones.nombre'
                    }
                }
            ];
            const resultado = await this._collection.aggregate(pipeline).toArray();
            return resultado[0] || null;
        } catch (error) {
            this._handleError('obtenerCapital', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en PaisRepositorio.${metodo}:`, error);
        throw error; // Re-lanzar para que el controlador lo maneje
    }
}

module.exports = new PaisRepositorio(); // Exportamos una instancia (Singleton)