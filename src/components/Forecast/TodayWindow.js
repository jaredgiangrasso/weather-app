import React from 'react';
import './TodayWindow.css';
import TodayLabel from './TodayLabel.js';
import Icon from './Icons.js'

//presentational today component
let todayWindow = (props) => {
	return (
		<div id='today-container'>
			<TodayLabel dayName={props.dayName} count={props.count}/>
			<div id='today-icon'>
				<Icon icon={props.weather.icon}/>
			</div>
			<ul id='weather-data'>
				<li id='high-low'><strong>High/Low:</strong> {Math.round(props.weather.temperatureHigh)}/{Math.round(props.weather.temperatureLow)}</li>
				<li id='description'><strong>Description:</strong> {props.weather.summary}</li>
				<li id="precipitation"><strong>Precipitation:</strong> {Math.round(props.weather.precipProbability * 100)}%</li>
				<li id='wind'><strong>Wind:</strong> {Math.round(props.weather.windSpeed * 0.621371)}mph</li>
				<li id='humidity'><strong>Humidity:</strong> {Math.round(props.weather.humidity * 100)}%</li>
				<li id='uv-index'><strong>UV Index:</strong> {Math.round(props.weather.uvIndex)}</li>
				<li id='visibility'><strong>Visibility:</strong> {Math.round(props.weather.visibility)}</li>
			</ul>
		</div>
	)
}

export default todayWindow;