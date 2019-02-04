import React, { Component } from 'react';
import axios from 'axios';
import './WeekContainer.css'
import DayWindow from './DayWindow.js';
import TodayWindow from './TodayWindow.js';
import Location from './Location.js';

class WeekContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			'weeklyWeather': {},
			'coordinates': {
				'latitude': '',
				'longitude': '',
			},
			'location': {
				'city': '',
				'state': '',
			},
			'query': '',
			'searchTerm': 'Brooklyn',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
	}

	getWeather(latitude, longitude) {
		const darkUrl = `https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/f8333dcfd78a8f0cfc293bdaaca7cdff/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags`;
		
		axios.get(darkUrl)
		.then(res => {
			var newWeeklyWeather = res.data.daily.data;
			this.setState({'weeklyWeather': newWeeklyWeather});

			var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${latitude},${longitude}`;
			return axios.get(geocodeUrl);
		})
		.then(res => {
			var city = res.data.results[0].locations[0].adminArea5;
			var state = res.data.results[0].locations[0].adminArea3;
			this.setState({'location': {'city': city, 'state': state}});
		})
		.catch(err=>console.log(err));
	}

	getCoordinates(searchTerm) {
		var reGeocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${searchTerm ? searchTerm : this.state.searchTerm}`;

		return new Promise ((resolve, reject) => {axios.get(reGeocodeUrl)
		.then(res => {
			var newLatitude = res.data.results[0].locations[0].latLng.lat;
			var newLongitude = res.data.results[0].locations[0].latLng.lng;
			resolve({'latitude': newLatitude, 'longitude': newLongitude});
		})
		.catch(err=>console.log(err));
	});
	}

	componentDidMount() {
		this.getWeather(40.6782, -73.9442);
	}

	handleChange(input) {
		this.setState({query: input})
	}

	handleSubmit() {
		var searchTerm = this.state.query; 
		this.getCoordinates(searchTerm)
		.then(res=>{
			var coordinates = res;
			this.getWeather(coordinates.latitude, coordinates.longitude);
		})
		.catch(err=>console.log(err))

	}

	renderDays() {
		var i = 0;

		if (this.state.weeklyWeather[0]) {
			return this.state.weeklyWeather.map((day) => {
				i++;
				if (i===1){
					return <TodayWindow key={day.time} weather={day} dayName={day.time} count={i}/>;
				} else if(i<8){
					return <DayWindow key={day.time} weather={day} dayName={day.time} count={i}/>;
				}
			})
		}
		else {
			return
		}
	}

	render(){
		return (
			<div id='week'>
				<div className='day-container'>
					{this.renderDays()}
				</div>
				<Location handleSubmit={this.handleSubmit} handleChange={this.handleChange} city={this.state.location.city} state={this.state.location.state} />
			</div>
		)
	}
}

export default WeekContainer;