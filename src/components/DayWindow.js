import React from 'react';
import Icon from './Icons.js'
import DayLabel from './DayLabel.js'
import './DayWindow.css';

let dayWindow = (props) => {

	//presentational day component
	return (
		<div id='day-container'>
			<DayLabel dayName={props.dayName} count={props.count}/>
			<Icon icon={props.weather.icon}/>
			<ul id='weather-data'>
				<li id='high-low'><strong>High/Low:</strong> {Math.round(props.weather.temperatureHigh)}/{Math.round(props.weather.temperatureLow)}</li>
				<li id='description'><strong>Description:</strong> {props.weather.summary}</li>
				<li id="precipitation"><strong>Precipitation:</strong> {Math.round(props.weather.precipProbability * 100)}%</li>
				<li id='wind'><strong>Wind:</strong> {Math.round(props.weather.windSpeed * 0.621371)}mph</li>
			</ul>
		</div>
	)
}

export default dayWindow;