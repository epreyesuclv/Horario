module.exports = (sequelize, Sequelize) => {
	const Evento = sequelize.define("evento", {
		fechaInicio: {
			type: Sequelize.DATE,
		},
		fechaFin: {
			type: Sequelize.DATE
		},
		nombre: {
			type: Sequelize.STRING
		}

	});
	Evento.associate = models => {

	}
	return Evento;
};