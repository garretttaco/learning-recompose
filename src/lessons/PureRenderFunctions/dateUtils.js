import moment from 'moment'
import { pick, range } from 'lodash'

export const dateTimeFormat = 'dddd, MMMM Do YYYY, h:mm:ss a'

export function getDateForDayOfTheWeek({ dayOfTheWeek, time }) {
	const calculatedDate = moment().day(dayOfTheWeek)
	const scheduleTime = getTimeValue({ time, currentMoment: calculatedDate })
	// if we haven't yet passed the day of the week that we scheduled
	if (moment().isBefore(scheduleTime)) {
		// then just give me this week's instance of that day
		return scheduleTime
	}
	// otherwise, give me next week's instance of that day
	return scheduleTime.add(1, 'weeks')
}

export function getTimeValue({ time, currentMoment }) {
	// Create object from the time passed in so that we can pick off only the hours, minutes and seconds
	const timeObj = moment(time, ['HH:mm:ss']).toObject()
	return (
		// Create a new moment here because otherwise current moment gets mutated
		moment(currentMoment)
			.startOf('day') // We only want to add the time of day duration
			.add(pick(timeObj, ['seconds', 'minutes', 'hours']))
	)
}

export const hoursOfTheDay = range(0, 25).map(num => `0${num}`.slice(-2))

export const minutesOfTheHour = range(0, 60, 15).map(num => `0${num}`.slice(-2))

export const scheduleDays = [
	{ id: 1, dayOfTheWeek: 'Sunday' },
	{ id: 2, dayOfTheWeek: 'Monday' },
	{ id: 3, dayOfTheWeek: 'Tuesday' },
	{ id: 4, dayOfTheWeek: 'Wednesday' },
	{ id: 5, dayOfTheWeek: 'Thursday' },
	{ id: 6, dayOfTheWeek: 'Friday' },
	{ id: 7, dayOfTheWeek: 'Saturday' },
]

