/**
 * ProfesorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	listProfesor: async function (req, res) {
		const data = { array: [{ name: "pepito" }] }
		return res.view('pages/dashboard/list-profesor', data)
	}

};

