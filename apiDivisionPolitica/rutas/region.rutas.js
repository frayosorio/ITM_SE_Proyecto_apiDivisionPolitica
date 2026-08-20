const express = require('express');
const regionControlador = require('../controladores/region.controlador');
const regionValidador = require('../validadores/region.validador');

class RegionRutas {
    constructor() {
        this.router = express.Router();
        this._configurarRutas();
    }

    _configurarRutas() {
        /**
         * @swagger
         * /api/paises/{id}/regiones:
         *   get:
         *     summary: Lista las regiones de un país
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del país
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Lista de regiones
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   nombre:
         *                     type: string
         *                   area:
         *                     type: number
         *                   poblacion:
         *                     type: number
         */
        this.router.get('/:id/regiones',
            regionValidador.validarIdPaisParam,
            (req, res) => regionControlador.listar(req, res)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones:
         *   post:
         *     summary: Agrega una región a un país
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del país
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nombre:
         *                 type: string
         *               area:
         *                 type: number
         *               poblacion:
         *                 type: number
         *     responses:
         *       200:
         *         description: Región agregada correctamente
         */
        this.router.post('/:id/regiones',
            regionValidador.validarIdPaisParam,
            regionValidador.validarCuerpo,
            (req, res) => regionControlador.agregar(req, res)
        );

        /**
 * @swagger
 * /api/paises/{id}/regiones:
 *   put:
 *     summary: Modifica una región existente
 *     tags: [Regiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               area:
 *                 type: number
 *               poblacion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Región modificada correctamente
 */
        this.router.put('/:id/regiones',
            regionValidador.validarIdPaisParam,
            regionValidador.validarCuerpo,
            (req, res) => regionControlador.modificar(req, res)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombre}:
         *   delete:
         *     summary: Elimina una región por nombre
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID del país
         *       - in: path
         *         name: nombre
         *         required: true
         *         schema:
         *           type: string
         *         description: Nombre de la región
         *     responses:
         *       200:
         *         description: Región eliminada correctamente
         */
        this.router.delete('/:id/regiones/:nombre',
            regionValidador.validarIdPaisParam,
            regionValidador.validarNombreParam,
            (req, res) => regionControlador.eliminar(req, res)
        );
    }

    get obtenerRouter() {
        return this.router;
    }
}

module.exports = new RegionRutas().obtenerRouter;