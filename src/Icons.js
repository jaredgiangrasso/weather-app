import React, { Component } from 'react';
import './Icons.css'

import clearDayIcon from './Images/Climacons_SVG Gradient/Sun.svg';
import clearNightIcon from './Images/Climacons_SVG Gradient/Moon.svg';
import rainIcon from './Images/Climacons_SVG Gradient/Cloud-Rain.svg';
import snowIcon from './Images/Climacons_SVG Gradient/Cloud-Snow.svg';
import sleetIcon from './Images/Climacons_SVG Gradient/Cloud-Hail.svg';
import windIcon from './Images/Climacons_SVG Gradient/Cloud-Wind.svg';
import fogIcon from './Images/Climacons_SVG Gradient/Cloud-Fog.svg';
import cloudyIcon from './Images/Climacons_SVG Gradient/Cloud.svg';
import partlyCloudyDayIcon from './Images/Climacons_SVG Gradient/Cloud-Sun.svg';
import partlyCloudyNightIcon from './Images/Climacons_SVG Gradient/Cloud-Moon.svg';

class weatherIcon extends Component {

	constructor(props){
		super(props);

		this.matchIcon = this.matchIcon.bind(this);
	}

	matchIcon(icon) {
		switch(icon) {
			case 'clear-day':
				return clearDayIcon;
			case 'clear-night':
				return clearNightIcon;
			case 'rain':
				return rainIcon;
			case 'snow':
				return snowIcon;
			case 'sleet':
				return sleetIcon;
			case 'wind':
				return windIcon;
			case 'fog':
				return fogIcon;
			case 'cloudy':
				return cloudyIcon;
			case 'partly-cloudy-day':
				return partlyCloudyDayIcon;
			case 'partly-cloudy-night':
				return partlyCloudyNightIcon;
			default:
				return;
		}
	} 

	render(){
		return(
			<img alt='weather icon' className='icon' src={this.matchIcon(this.props.icon)}/>
		)
	}

}
export default weatherIcon;