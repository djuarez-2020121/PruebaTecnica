'use strict'

const express = require('express');
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../../middlewares/autorization');
const api = express.Router();

//Ruta de testeo
api.get('/cursoTest', cursoController.cursoTest);

//Rutas publicas
api.get('/getCursos', cursoController.getCursos);

//Rutas privadas
api.get('/getCurso/:id', cursoController.getOne);
api.post('/addCurso',cursoController.addCurso);
api.put('/updateCurso/:id', cursoController.updateCurso);
api.delete('/deleteCurso/:id', cursoController.deleteCurso);



module.exports = api;