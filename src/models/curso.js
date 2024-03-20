module.exports = (sequelize, Sequelize) => {
	const Curso = sequelize.define("curso", {
		anno: {
			type: Sequelize.INTEGER,
		},
		semestre: {
			type: Sequelize.INTEGER
		},
		inicio: {
			type: Sequelize.DATE
		},
		fin: {
			type: Sequelize.DATE
		}

	});
	Curso.associate = models => {
		Curso.hasMany(models.AsignProfCurso)
		Curso.hasMany(models.Horario)
		Curso.hasMany(models.Evento)
		Curso.belongsTo(models.Carrera)
	}
	return Curso;
};