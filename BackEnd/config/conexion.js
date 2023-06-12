'use strict';
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Alejandro99',
  database: 'LIMBERTIT',
  port: 3306

})

connection.connect((err)=>{
    if(err){
        console.log('Ha ocurrido un error en la conexión a la BD: '+err);
    }else {
        console.log('Conexión existosa a la BD :)');
    }

});

module.exports = connection;