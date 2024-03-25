module.exports = (sequelize, Sequelize) => {
	const AsignProfCurso = sequelize.define("asignProfCurso", {

		frecuency: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	});
	AsignProfCurso.associate = models => {
		AsignProfCurso.belongsTo(models.Curso)
		AsignProfCurso.belongsTo(models.Profesor)
		AsignProfCurso.belongsTo(models.Asignatura)
		AsignProfCurso.hasMany(models.Turno)
	}
	return AsignProfCurso;
};