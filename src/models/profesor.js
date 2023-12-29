module.exports = (sequelize, Sequelize) => {
	const Profesor = sequelize.define("profesor", {
		nombre: {
			type: Sequelize.STRING,
		}
	});
	Profesor.associate = models => {
		Profesor.hasMany(models.AsignProfCurso)
	}
	return Profesor;
};