module.exports = (sequelize, Sequelize) => {
	const Turnos = sequelize.define("turnos", {
		semana: {
			type: Sequelize.INTEGER,
		},
		dia: {
			type: Sequelize.INTEGER
		},
		turno: {
			type: Sequelize.STRING
		},


	});
	Turnos.associate = models => {
		Turnos.belongsTo(models.AsignProfCurso)
	}
	return Turnos;
};