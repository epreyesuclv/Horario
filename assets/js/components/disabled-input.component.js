/**
 * <disabled-input>
 * -----------------------------------------------------------------------------
 * 
 * input that gets disabled
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */
console.log('cargo este archiuvo')
parasails.registerComponent('disabledInput', {
	//  ╔═╗╦═╗╔═╗╔═╗╔═╗
	//  ╠═╝╠╦╝║ ║╠═╝╚═╗
	//  ╩  ╩╚═╚═╝╩  ╚═╝
	props: [
		'label'
	],

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: function () {
		return {
		};
	},

	//  ╦ ╦╔╦╗╔╦╗╦
	//  ╠═╣ ║ ║║║║
	//  ╩ ╩ ╩ ╩ ╩╩═╝
	template: `<div class="horario-card d-flex">
					<h2>{{label}}</h2>
					<div class="opciones">
						<a class="btn btn-primary">Editar</a>
						<a href="#" class="btn btn-danger">Eliminar</a>
					</div>
				</div>

	`,

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function () {
		console.log("before mount")
	},
	mounted: async function () {
		//…
	},
	beforeDestroy: function () {
		//…
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {

	}
});
