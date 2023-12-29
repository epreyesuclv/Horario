module.exports = (sequelize, Sequelize) => {
	const Horario = sequelize.define("horario", {
		code: {
			type: Sequelize.STRING,
		},
		info: {
			type: Sequelize.JSON
		},


	});
	Horario.associate = models => {
		Horario.belongsTo(models.Curso)
	}
	return Horario;
};