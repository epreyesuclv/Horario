module.exports = (sequelize, Sequelize) => {
	const Turnos = sequelize.define("turnos", {
		semana: {
			type: Sequelize.INTEGER,
		},
		dia: {
			type: Sequelize.INTEGER
		},
		turno: {
			type: Sequelize.INTEGER
		},


	});
	Turnos.associate = models => {
		Turnos.belongsTo(models.AsignProfCurso, { onDestroy: 'CASCADE' })
	}
	return Turnos;
};