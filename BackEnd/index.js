'use strict';
require ('./config/conexion');
const express = require('express');
const cors = require('cors');
const port = (process.env.PORT || 3000);
const app = express();

/*PORT*/
app.set('port', port);
app.use(express.json());
app.use(cors());

//Rutas
const cursRoutes = require('./src/routes/cursoRoutes');
const estudianteRoutes = require('./src/routes/estudianteRoutes');
const asignacionRoutes = require('./src/routes/asignacionRoutes')

//app.use('/estudiante',require('./src/controllers/estudianteController'));
//app.use('/curso',require('./src/controllers/cursoController'));
//app.use('/asig',require('./src/controllers/asignacionController'));

//Uso de rutas
app.use('/curso',cursRoutes);
app.use('/estudiante',estudianteRoutes);
app.use('/asignacion',asignacionRoutes);



app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('Error al iniciar servidor: ' + err)
    }
    else{
        console.log('Servidor iniciado en el puerto: ' +port)
    }
});