'use strict';
const conexion = require('../../config/conexion');
const jwt = require('jsonwebtoken');



exports.estudianteTest = async (req, res) => {
    await res.send({ message: 'Modúlo de Estudiante corriendo' })
}


// INICIO DE SESION
exports.loginEstudiante = (req, res) => {
    try {
        const data = req.body;
        // Verificar que todos los datos requeridos estén presentes
        if (!data || !data.email || !data.contra) {
            return res.status(400).send({ mensaje: 'Email y contraseña son requeridos' });
        }

        let sql = `select * from Estudiantes where email = '${data.email}'`;
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el email no existe
                    return res.status(404).send({ mensaje: 'El email no se encontró' });
                } else {
                    const estudiante = rows[0];

                    // Verificar la contraseña
                    if (data.contra === estudiante.contra) {
                        // Contraseña correcta, generar token
                        const token = jwt.sign({ id: estudiante.IDEstudiante, nombre: estudiante.nombre }, 'secreto', { expiresIn: '24h' });

                        res.json({ mensaje: `Bienvenido al sistema, ${estudiante.nombre}!`, token: token });
                    } else {
                        // Contraseña incorrecta
                        res.status(401).send({ mensaje: 'Contraseña incorrecta' });
                    }
                }
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al iniciar sesión.', err });
    }
}

//----- GET 
exports.getEstudiantes = (req, res) => {
    try {
        let sql = 'select * from Estudiantes';
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                res.json(rows);
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los estudiantes.', err });
    }
}

//----- GET ONE 
exports.getEstudiante = (req, res) => {
    try {
        const { id } = req.params;
        let sql = 'select * from Estudiantes where IDEstudiante = ?';
        conexion.query(sql, [id], (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el estudiante no existe
                    res.status(404).send({ mensaje: 'El estudiante no se encontró o no existe' });
                } else {
                    res.send(rows);
                }
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener el estudiante.', err });
    }
}

//------ INSERTAR UN ESTUDIANTE
exports.addEstudiante = (req, res) => {
    try {
        const data = req.body;
        // Verificar que todos los datos requeridos estén presentes
        if (!data.nombre || !data.email || !data.contra) {
            return res.status(400).send({ mensaje: 'Todos los datos son requeridos' });
        }
        let sql = `insert into Estudiantes (nombre, email, contra) values ('${data.nombre}', '${data.email}', '${data.contra}')`;
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send({ message: 'Estudiante agregado exitosamente' });
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al agregar un estudiante.', err });
    }
}


//---------UPDATE UN ESTUDIANTE
exports.updateEstudiante = (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        let sqlSelect = `select * from Estudiantes where IDEstudiante = '${id}'`;
        conexion.query(sqlSelect, (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el estudiante no existe
                    return res.status(404).send({ mensaje: 'El ID del estudiante no se encontró o no existe' });
                }

                let sqlUpdate = `update Estudiantes set 
                  nombre = '${data.nombre}',
                  email = '${data.email}',
                  contra = '${data.contra}'
                  where IDEstudiante = '${id}'`;

                conexion.query(sqlUpdate, (err, rows, fields) => {
                    if (err) throw err;
                    else {
                        res.send({ status: 'Estudiante actualizado exitosamente.' });
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar un estudiante.', err });
    }
}

//----------- DELETE UN ESTUDIANTE
exports.deleteEstudiante = (req, res) => {
    try {
        const { id } = req.params;
        let sqlSelect = `select * from Estudiantes where IDEstudiante = '${id}'`;
        conexion.query(sqlSelect, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length === 0) {
                res.status(400).send({ error: 'El Estudiante ya se ha eliminado o no existe.' });
            }
            else {
                let sql = `delete from Estudiantes where IDEstudiante = '${id}'`;
                conexion.query(sql, (err, rows, fields) => {
                    if (err) throw err;
                    else {
                        res.send({ status: 'Estudiante eliminado exitosamente.' });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar un estudiante.', err });
    }
}