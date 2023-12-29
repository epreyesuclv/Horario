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
		'profesorId',
		'label',
	],

	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: function () {
		return {
			editable: false,
			labelValue: this.label,
		};
	},

	//  ╦ ╦╔╦╗╔╦╗╦
	//  ╠═╣ ║ ║║║║
	//  ╩ ╩ ╩ ╩ ╩╩═╝
	template: `<div class="horario-card d-flex">
					<input v-if="editable" :value=[labelValue]></input>
					<input v-else="editable" disabled :value=[labelValue]></input>
					<div class="opciones">
						<a  v-if="!editable" class="btn btn-primary" @click="clickEditar()">Editar</a>
						<a id="guardarbtn"  v-else class="btn btn-primary" @click="clickGuardar()">Guardar</a>
						<a href="#" class="btn btn-danger">Eliminar</a>
					</div>
				</div>

	`,

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function () {
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
		clickGuardar: function () {
			// guardar
			this.$emit('guardar', {
			profesorId: this.profesorId,
			label: this.label,
			})
			this.editable = !this.editable;
		},
		clickEditar: function () {
			this.editable = true;
		}
	}
});
