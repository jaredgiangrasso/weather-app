import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchWeather, fetchLocation, updateQuery } from '../redux/actions.js';
import './WeekContainer.css';
import DayWindow from './DayWindow.js';
import TodayWindow from './TodayWindow.js';
import Location from './Location.js';

class WeekContainer extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
	}

	//fetch weather based on latitude and longitude
	getWeather(latitude, longitude) {
		this.props.fetchWeather(latitude, longitude);
	}

	//get coordinates of current search term location using MapQuest reverse geocode API
	//Use 'Brooklyn' as default or get query from handleSubmit
	getCoordinates(searchTerm) {
		var reGeocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${searchTerm ? searchTerm : 'Brooklyn'}`;

		return new Promise ((resolve, reject) => {axios.get(reGeocodeUrl)
		.then(res => {
			var newLatitude = res.data.results[0].locations[0].latLng.lat;
			var newLongitude = res.data.results[0].locations[0].latLng.lng;
			resolve({'latitude': newLatitude, 'longitude': newLongitude});
		})
		.catch(err=>console.log(err));
	});
	}

	//call getWeather with Brooklyn coordinates as default
	componentDidMount() {
		this.getWeather(40.6782, -73.9442);
	}

	//update state based on input to control component
	handleChange(input) {
		this.props.updateQuery(input);
	}

	//call getCoordinates with submission query
	handleSubmit() {
		var searchTerm = this.props.query; 
		this.getCoordinates(searchTerm)
		.then(res=>{
			var coordinates = res;
			this.getWeather(coordinates.latitude, coordinates.longitude);
		})
		.catch(err=>console.log(err))

	}

	//map API data to TodayWindow and DayWindows
	//display error message if data hasn't arrived
	renderDays() {
		return this.props.weeklyWeather[0] ?
			this.props.weeklyWeather.map((day, i) => {
				if (i < 1){
					return <TodayWindow key={day.time} weather={day} dayName={day.time} count={i}/>;
				} else if (i < 7) {
					return <DayWindow key={day.time} weather={day} dayName={day.time} count={i}/>;
				}
			})
		: <h1>Something's happened to our data - Come back soon!</h1>
	}

	//render weather and location/searchbar
	render(){
		return (
			<div id='week'>
				<div className='day-container'>
					{this.renderDays()}
				</div>
				<Location handleSubmit={this.handleSubmit} handleChange={this.handleChange} city={this.props.location.city} state={this.props.location.state} />
			</div>
		)
	}
}


//react-redux connect

//select data from store
const mapStateToProps = (state) => ({
	weeklyWeather: state.weeklyWeather,
	location: state.location,
	query: state.query,
})

//allow functions to dispatch
const mapDispatchToProps = {
	fetchLocation,
	fetchWeather,
	updateQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekContainer);