module.exports = (sequelize, Sequelize) => {
	const Profesor = sequelize.define("profesor", {
		nombre: {
			type: Sequelize.STRING,
		},
		departamento:{
			type:Sequelize.STRING
		},
		restricciones: {
			type: Sequelize.JSON
		}
	});
	Profesor.associate = models => {
		Profesor.hasMany(models.AsignProfCurso)
	}
	return Profesor;
};