import React, { Component } from 'react';
import './DayLabel.css';

class DayLabel extends Component {

	getDayName(timestamp){

		//Get date and isolate day name
		var d = new Date(timestamp*1000);
		d = d.toString().substring(0,3);

		//return full day name
		switch(d){
			case 'Sun':
				return 'Sunday';
			case 'Mon':
				return 'Monday';
			case 'Tue':
				return 'Tuesday';
			case 'Wed':
				return 'Wednesday';
			case 'Thu':
				return 'Thursday';
			case 'Fri':
				return 'Friday';
			case 'Sat':
				return 'Saturday';
			default:
				return;
		}
	}

	render(){
		return (
			<div id='dayLabel'>
				<p>{this.getDayName(this.props.dayName)}</p>
			</div>
		)
	}

}

export default DayLabel;