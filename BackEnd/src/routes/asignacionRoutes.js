'use strict'

const express = require('express');
const asignaController = require('../controllers/asignacionController');
const authMiddleware = require('../../middlewares/autorization');
const api = express.Router();

//Ruta de testeo
api.get('/asignacionTest', asignaController.asignacionTest);

//Rutas publicas
api.get('/getAsignaciones',asignaController.getAsignaciones);

//Rutas privadas
api.get('/getAsignacion/:id', asignaController.getAsignacion);
api.post('/addAsignacion',asignaController.addAsignacion);
api.put('/updateAsignacion/:id', asignaController.updateAsignacion);
api.delete('/deleteAsignacion/:id', asignaController.deleteAsignacion);



module.exports = api;