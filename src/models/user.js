module.exports = (sequelize, Sequelize) => {
	const Profesor = sequelize.define("user", {
		username: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		}
	});
	Profesor.associate = models => {
		//
	}
	return Profesor;
};