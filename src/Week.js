import React, { Component } from 'react';
import './Week.css';
import DayWindow from './DayWindow.js';

class Week extends Component {

	render() {
		return (
			<div id="Week">
				<DayWindow />
				<DayWindow />
				<DayWindow />
				<DayWindow />
				<DayWindow />
				<DayWindow />
				<DayWindow />
			</div>
		)
	}
}

export default Week;