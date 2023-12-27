/**
 * AsignaturaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	/**
	 * `AsignaturaController.Asignatura()`
	 */
	horario: async function (req, res) {
		//load from db
		const data = { array: [{ name: "Pepito", id: 1 }] }
		return res.view('pages/dashboard/revisar-horario', data)
	},
	createHorario: async function (req, res) {
		// load db

	},
	editHorario: async function (req, res) {
		console.log(req.params)

		//load from db
		const data = {

		}
		res.view('pages/dashboard/edit-horario', data)
	}
};

