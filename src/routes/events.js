;
const express = require('express')
const { Curso, Evento } = require('../models')
const router = express.Router()

router.get('/event', async (req, res) => {
	const { cursoId } = req.params
	const events = await Evento.findAll({ where: { cursoId: cursoId } })
	res.status(200).json(events)
})

router.post('/event', async (req, res) => {
	console.log(req.body)
	const { event, cursoId } = req.body
	await Evento.create({ cursoId, ...event })
	res.status(200).json({ message: 'OK' })
})

router.delete('/event', async (req, res) => {
	console.log(req.params)
	const { id } = req.params
	const evnt = await Evento.findByPk(id)
	if (evnt) {
		await evnt.destroy()
		res.status(200).json({
			message: 'OK'
		})
	}
	else
		res.status(402).json({
			message: 'Not Found'
		})
	res.status(200).json({ message: 'OK' })
})

module.exports = router
