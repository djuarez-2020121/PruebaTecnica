'use strict';
const conexion = require('../../config/conexion');



exports.asignacionTest = async (req, res) => {
    await res.send({ message: 'Modúlo de Asignación corriendo' })
}


//----- GET 
exports.getAsignaciones = (req, res) => {
    try {
        let sql = `select A.*, C.nombreCurso, E.nombre 
                   from Asignacion A
                   inner JOIN Cursos C ON A.IDCurso = C.IDCurso
                   inner JOIN Estudiantes E ON A.IDEstudiante = E.IDEstudiante`;

        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send(rows);
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener las asignaciones.', err });
    }
}


exports.getAsignacion = (req, res) => {
    try {
        const { id } = req.params;
        let sql = `select A.*, C.nombreCurso, E.nombre 
                   from Asignacion A
                   inner JOIN Cursos C ON A.IDCurso = C.IDCurso
                   inner JOIN Estudiantes E ON A.IDEstudiante = E.IDEstudiante
                   where A.IDAsignacion = ?`;

        conexion.query(sql, [id], (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, la asignación no existe
                    res.status(404).send({ mensaje: 'La Asignación no se encontró o no existe' });
                } else {
                    res.send(rows);
                }
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener una asignación.', err });
    }
}

//------ INSERTAR UNA ASIGNACION
exports.addAsignacion = (req, res) => {
    try {
        const { IDEstudiante, IDCurso } = req.body;
        // Verificar que todos los datos requeridos estén presentes
        if (!IDEstudiante || !IDCurso) {
            return res.status(400).send({ mensaje: 'Todos los datos son requeridos' });
        }
        let sqlEstudiante = `select * from Estudiantes where IDEstudiante = '${IDEstudiante}'`;
        conexion.query(sqlEstudiante, (errEstudiante, rowsEstudiante, fieldsEstudiante) => {
            if (errEstudiante) throw errEstudiante;
            else {
                if (rowsEstudiante.length === 0) {
                    // Si no se encontraron filas, el ID del estudiante no existe
                    return res.status(404).send({ mensaje: 'El ID del estudiante no se encontró o no existe' });
                } else {
                    let sqlCurso = `select * from Cursos where IDCurso = '${IDCurso}'`;
                    conexion.query(sqlCurso, (errCurso, rowsCurso, fieldsCurso) => {
                        if (errCurso) throw errCurso;
                        else {
                            if (rowsCurso.length === 0) {
                                // Si no se encontraron filas, el ID del curso no existe
                                return res.status(404).send({ mensaje: 'El ID del curso no se encontró o no existe' });
                            } else {
                                let sqlAsignacion = `insert into Asignacion (IDEstudiante, IDCurso) values ('${IDEstudiante}', '${IDCurso}')`;
                                conexion.query(sqlAsignacion, (errAsignacion, rowsAsignacion, fieldsAsignacion) => {
                                    if (errAsignacion) throw errAsignacion;
                                    else {
                                        res.send({ status: 'Asignacion agregada exitosamente.' });
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al agregar una asignación.', err });
    }
}


//----------- UPDATE UNA ASIGNACION
exports.updateAsignacion = (req, res) => {
    try {
        const { id } = req.params;
        const { IDEstudiante, IDCurso } = req.body;
        let sqlSelect = `select * from Asignacion where IDAsignacion = '${id}'`;
        conexion.query(sqlSelect, (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length === 0) {
                    // Si no se encontraron filas, el estudiante no existe
                    return res.status(404).send({ mensaje: 'El ID del Asignacion no se encontró o no existe' });
                }

                let sqlUpdate = `update Asignacion set 
                    IDEstudiante = '${IDEstudiante}',
                    IDCurso = '${IDCurso}'
                    where IDAsignacion = '${id}'`;

                conexion.query(sqlUpdate, (err, rows, fields) => {
                    if (err) throw err;
                    else {
                        res.send({ status: 'Asignacion actualizado exitosamente.' });
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar una asignación.', err });
    }
}


//----------- DELETE UNA ASIGNACION
exports.deleteAsignacion = (req, res) => {
    try {
        const { id } = req.params;
        let sqlSelect = `select * from Asignacion where IDAsignacion = '${id}'`;
        conexion.query(sqlSelect, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length === 0) {
                res.status(400).send({ error: 'La Asignación ya se ha eliminado o no existe.' });
            }
            else {
                let sql = `delete from Asignacion where IDAsignacion = '${id}'`;
                conexion.query(sql, (err, rows, fields) => {
                    if (err) throw err;
                    else {
                        res.send({ status: 'Asignación eliminado exitosamente.' });
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar una asignación.', err });
    }
}
