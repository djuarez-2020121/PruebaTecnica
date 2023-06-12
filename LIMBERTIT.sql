/*
Nombre del Programador:	Daniel Alejandro Juarez García   
*/
/*Creación de la base de datos*/

create database LIMBERTIT;
use LIMBERTIT;

/*Creación de las tablas*/
/*Tabla Estudiantes*/
create table Estudiantes(
	IDEstudiante INT not null auto_increment,
    nombre VARCHAR(150) not null,
    email VARCHAR(150) not null,
    contra VARCHAR(150) not null,
    primary key PK_IDEstudiante (IDEstudiante)
);

/*Tabla Cursos*/
create table Cursos(
	IDCurso INT not null auto_increment,
    nombreCurso VARCHAR(150) not null,
    primary key PK_IDCurso (IDCurso)
);


/*Tabla Asignacion*/
create table Asignacion(
	IDAsignacion INT not null auto_increment,
    IDEstudiante INT not null,
    IDCurso INT not null,
    primary key PK_IDAsignacion (IDAsignacion),
		constraint FK_Asignacion_Estudiantes foreign key (IDEstudiante)
		references Estudiantes(IDEstudiante),
        constraint FK_Asignacion_Cursos foreign key (IDCurso)
		references Cursos(IDCurso)
);
select * from Cursos;
select * from Estudiantes;