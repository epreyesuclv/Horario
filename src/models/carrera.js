module.exports = (sequelize, Sequelize) => {
	const Carrera = sequelize.define("carrera", {
		nombre: {
			type: Sequelize.STRING,
			required: true
		},

	});
	Carrera.associate = models => {
		Carrera.hasMany(models.Curso)
	}
	return Carrera;
};