////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// A guideline I recommend, is to place all JSX markup in a SFC with little to no functionality.
// By starting your components like this, you are enforcing a good pattern in your code base which will help you to avoid mixing concerns.
// Let's practice this on our scheduler below.
// - Abstract out the functionality that we have, in DisplaySchedule, that converts the state object to the next scheduled time.
// (Hint: the withProps HoC might be useful for this).
// (Hint: The resulting DisplaySchedule SFC should only have a return)
// - Abstract the state from App into an HoC (Hint: withState may be useful).
// - Move the class method, updateSchedule, on ConfigureComponent into a withHandlers HoC.
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
// import { compose, withState, withHandlers, withProps } from 'recompose'
import { FormControl } from 'react-bootstrap'
import moment from 'moment'
import {
	getDateForDayOfTheWeek,
	dateTimeFormat,
	hoursOfTheDay,
	minutesOfTheHour,
	scheduleDays,
} from './dateUtils'

class ConfigureSchedule extends React.Component {
	updateSchedule = ({ target }) => {
		const { name, value } = target
		const { schedule, setSchedule } = this.props
		setSchedule({ ...schedule, [name]: value })
	}

	render() {
		const { schedule } = this.props
		return (
			<div className="owl">
				<h3>Update schedule time</h3>
				<div className="howl">
					<div className="time-select">
						<FormControl
							componentClass="select"
							value={schedule.day}
							onChange={this.updateSchedule}
							name="day"
						>
							{Object.values(scheduleDays).map(msd => (
								<option key={msd.id} value={msd.id}>{msd.dayOfTheWeek}</option>
							))}
						</FormControl>
					</div>
					<div className="time-select">
						<FormControl
							componentClass="select"
							value={schedule.hour}
							onChange={this.updateSchedule}
							name="hour"
						>
							{hoursOfTheDay.map(hour => {
								const twelveHourTime = moment(hour, ['h']).format('h A')
								return <option key={hour} value={hour}>{twelveHourTime}</option>
							})}
						</FormControl>
					</div>
					<span>:</span>
					<div className="time-select">
						<FormControl
							componentClass="select"
							value={schedule.minute}
							onChange={this.updateSchedule}
							name="minute"
						>
							{minutesOfTheHour.map(minute => (
								<option key={minute} value={minute}> {minute} </option>
							))}
						</FormControl>
					</div>
				</div>
			</div>
		)
	}
}

const DisplaySchedule = ({ schedule }) => {
	const { day, hour, minute } = schedule
	// We subtract one here to match our ids to moments day of the week integers
	const scheduleDayOfTheWeek = day - 1
	const scheduleTime = moment(`${hour}:${minute}`, ['HH:mm']).format('HH:mm:ss')
	const dateTime = getDateForDayOfTheWeek({
		dayOfTheWeek: scheduleDayOfTheWeek,
		time: scheduleTime,
	}).format(dateTimeFormat)
	return (
		<div>
			<h3>Next scheduled time</h3>
			<pre>{dateTime}</pre>
		</div>
	)
}

class App extends React.Component {
	state = {
		schedule: {
			day: 1, // Sunday
			hour: '00',
			minute: '00',
		},
	}

	setSchedule = schedule => {
		this.setState({ schedule })
	}

	render() {
		const { schedule } = this.state
		return (
			<div className="pure-render-functions">
				<DisplaySchedule schedule={schedule} />
				<ConfigureSchedule setSchedule={this.setSchedule} schedule={schedule} />
			</div>
		)
	}
}

export { App as Exercise }
