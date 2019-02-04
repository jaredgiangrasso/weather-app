import React, { Component } from 'react';
import './TodayWindow.css';
import TodayLabel from './TodayLabel.js';
import Icon from './Icons.js'

class TodayWindow extends Component{
	
	render(){
		return (
			<div id='today-container'>
				<TodayLabel dayName={this.props.dayName} count={this.props.count}/>
				<div id='today-icon'>
					<Icon icon={this.props.weather.icon}/>
				</div>
				<ul id='weather-data'>
					<li id='high-low'><strong>High/Low:</strong> {Math.round(this.props.weather.temperatureHigh)}/{Math.round(this.props.weather.temperatureLow)}</li>
					<li id='description'><strong>Description:</strong> {this.props.weather.summary}</li>
					<li id="precipitation"><strong>Precipitation:</strong> {Math.round(this.props.weather.precipProbability * 100)}%</li>
					<li id='wind'><strong>Wind:</strong> {Math.round(this.props.weather.windSpeed * 0.621371)}mph</li>
					<li id='humidity'><strong>Humidity:</strong> {Math.round(this.props.weather.humidity * 100)}%</li>
					<li id='uv-index'><strong>UV Index:</strong> {Math.round(this.props.weather.uvIndex)}</li>
					<li id='visibility'><strong>Visibility:</strong> {Math.round(this.props.weather.visibility)}</li>
				</ul>
			</div>
		)
	}

}

export default TodayWindow;