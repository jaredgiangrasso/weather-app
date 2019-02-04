import React, { Component } from 'react';
import Icon from './Icons.js'
import DayLabel from './DayLabel.js'
import './DayWindow.css';

class DayWindow extends Component {

	render() {

		return (
			<div id='day-container'>
				<DayLabel dayName={this.props.dayName} count={this.props.count}/>
				<Icon icon={this.props.weather.icon}/>
				<ul id='weather-data'>
					<li id='high-low'><strong>High/Low:</strong> {Math.round(this.props.weather.temperatureHigh)}/{Math.round(this.props.weather.temperatureLow)}</li>
					<li id='description'><strong>Description:</strong> {this.props.weather.summary}</li>
					<li id="precipitation"><strong>Precipitation:</strong> {Math.round(this.props.weather.precipProbability * 100)}%</li>
					<li id='wind'><strong>Wind:</strong> {Math.round(this.props.weather.windSpeed * 0.621371)}mph</li>
				</ul>
			</div>
		)
	}
}

export default DayWindow;