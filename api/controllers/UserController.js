/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


	/**
	 * `UserController.Asignatura()`
	 */
	find: async function (req, res) {
		return res.view('pages/dashboard/list_user',{data:[1,2,3,45]});
	}


};

