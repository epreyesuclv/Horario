module.exports = (sequelize, Sequelize) => {
	const Asignatura = sequelize.define("asignatura", {
		nombre: {
			type: Sequelize.STRING,
			required: true
		},

	});
	Asignatura.associate = models => {
		Asignatura.hasMany(models.AsignProfCurso)
	}
	return Asignatura;
};