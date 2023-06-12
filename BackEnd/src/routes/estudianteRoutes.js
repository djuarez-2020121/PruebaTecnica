'use strict'

const express = require('express');
const estudianteController = require('../controllers/estudianteController');
const authMiddleware = require('../../middlewares/autorization');
const api = express.Router();

//Ruta de testeo
api.get('/estudianteTest', estudianteController.estudianteTest);

//Rutas publicas
api.post('/login', estudianteController.loginEstudiante);
api.get('/getEstidiantes',estudianteController.getEstudiantes);

//Rutas privadas
api.get('/getEstudiante/:id', estudianteController.getEstudiante);
api.post('/addEstudiante',estudianteController.addEstudiante);
api.put('/updateEstudiante/:id', estudianteController.updateEstudiante);
api.delete('/deleteEstudiante/:id', estudianteController.deleteEstudiante);



module.exports = api;