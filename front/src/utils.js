import moment from 'moment'

export const disableDay = (date) => {
	const dayOfWeek = moment(date).weekday()
	return dayOfWeek !== 1
}

