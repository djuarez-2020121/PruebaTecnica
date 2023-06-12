'use strict';

const conexion = require('../../config/conexion');


exports.cursoTest = async (req, res) => {
    await res.send({ message: 'Modúlo de Curso corriendo' })
}



//----- GET 
exports.getCursos = (req, res) => {
    try {
        let sql = 'select * from Cursos';
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send(rows);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener los cursos.', err });
    }
}


//-------GET ONE
exports.getOne = (req, res) => {
    try {
        const { id } = req.params;
        let sql = 'select * from Cursos where IDCurso = ?';
        conexion.query(sql, [id], (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el estudiante no existe
                    res.status(404).send({ mensaje: 'El curso no se encontró o no existe' });
                } else {
                    res.send(rows);
                }
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener un curso.', err });
    }
}

//------ INSERTAR UN CURSO
exports.addCurso = (req, res) => {
    try {
        const data = req.body;
        // Verificar que todos los datos requeridos estén presentes
        if (!data.nombreCurso) {
            return res.status(400).send({ mensaje: 'Todos los datos son requeridos' });
        }
        let sql = `select * from Cursos where nombreCurso = '${data.nombreCurso}'`;
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                // El nombre del curso ya existe
                return res.status(400).send({ mensaje: 'El nombre del curso ya existe' });
            } else {
                // El nombre del curso no existe, se puede insertar
                sql = `insert into Cursos (nombreCurso) values ('${data.nombreCurso}')`;
                conexion.query(sql, (err, result) => {
                    if (err) throw err;
                    res.send({ mensaje: 'Curso agregado exitosamente' });
                });
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al agregar un curso.', err });
    }
}

//---------UPDATE UN CURSO
exports.updateCurso = (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCurso } = req.body;
        let sqlSelect = `select * from Cursos where IDCurso = '${id}'`;
        conexion.query(sqlSelect, (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el curso no existe
                    return res.status(404).send({ mensaje: 'El ID del curso no se encontró o no existe' });
                }

                let sqlUpdate = `update Cursos set 
                  nombreCurso = '${nombreCurso}'
                  where IDCurso = '${id}'`;

                conexion.query(sqlUpdate, (err, rows, fields) => {
                    if (err) throw err;
                    else {
                        res.send({ status: 'Curso actualizado exitosamente.' });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar un curso.', err });
    }
}


//----------- DELETE UN CURSO
exports.deleteCurso = (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID del curso está presente en otra tabla
        let sqlCheck = `select * from Asignacion where IDCurso = '${id}'`;
        conexion.query(sqlCheck, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                // El ID del curso pertenece a otro registro en otra tabla
                return res.status(400).send({ mensaje: 'El ID pertenece a otro registro. No se puede eliminar el curso.' });

            } else {
                // El ID del curso no está presente en otra tabla, se puede eliminar
                let sqlDelete = `delete from Cursos where IDCurso = '${id}'`;
                conexion.query(sqlDelete, (err, result) => {
                    if (err) throw err;
                    res.send({ status: 'Curso eliminado exitosamente.' });
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar un curso.', err });
    }
}