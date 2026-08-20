const express = require('express');
const ciudadControlador = require('../controladores/ciudad.controlador');
const ciudadValidador = require('../validadores/ciudad.validador');

class CiudadRutas {
    constructor() {
        this.router = express.Router();
        this._configurarRutas();
    }

    _configurarRutas() {
        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombreRegion}/ciudades:
         *   get:
         *     summary: Lista las ciudades de una región
         *     tags: [Ciudades]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID del país
         *       - in: path
         *         name: nombreRegion
         *         schema:
         *           type: string
         *         required: true
         *         description: Nombre de la región
         *     responses:
         *       200:
         *         description: Lista de ciudades
         */
        this.router.get('/:id/regiones/:region/ciudades',
            ciudadValidador.validarParams,
            (req, res) => ciudadControlador.listar(req, res)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombreRegion}/ciudades:
         *   post:
         *     summary: Agrega una nueva ciudad a una región
         *     tags: [Ciudades]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID del país
         *       - in: path
         *         name: nombreRegion
         *         schema:
         *           type: string
         *         required: true
         *         description: Nombre de la región
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nombre:
         *                 type: string
         *               habitantes:
         *                 type: integer
         *               esCapital:
         *                 type: boolean
         *     responses:
         *       200:
         *         description: Ciudad agregada
         */
        this.router.post('/:id/regiones/:region/ciudades',
            ciudadValidador.validarParams,
            ciudadValidador.validarCuerpo,
            (req, res) => ciudadControlador.agregar(req, res)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombreRegion}/ciudades:
         *   put:
         *     summary: Modifica una ciudad de una región
         *     tags: [Ciudades]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID del país
         *       - in: path
         *         name: nombreRegion
         *         schema:
         *           type: string
         *         required: true
         *         description: Nombre de la región
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nombre:
         *                 type: string
         *               habitantes:
         *                 type: integer
         *               esCapital:
         *                 type: boolean
         *     responses:
         *       200:
         *         description: Ciudad modificada
         */
        this.router.put('/:id/regiones/:region/ciudades',
            ciudadValidador.validarParams,
            ciudadValidador.validarCuerpo,
            (req, res) => ciudadControlador.modificar(req, res)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombreRegion}/ciudades/{nombreCiudad}:
         *   delete:
         *     summary: Elimina una ciudad de una región
         *     tags: [Ciudades]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID del país
         *       - in: path
         *         name: nombreRegion
         *         schema:
         *           type: string
         *         required: true
         *         description: Nombre de la región
         *       - in: path
         *         name: nombreCiudad
         *         schema:
         *           type: string
         *         required: true
         *         description: Nombre de la ciudad
         *     responses:
         *       200:
         *         description: Ciudad eliminada
         */
        this.router.delete('/:id/regiones/:region/ciudades/:nombreCiudad',
            ciudadValidador.validarParams,
            (req, res) => ciudadControlador.eliminar(req, res)
        );
    }

    get obtenerRouter() { return this.router; }
}

module.exports = new CiudadRutas().obtenerRouter;