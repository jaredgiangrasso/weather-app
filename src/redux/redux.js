import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Create initial state
const initialState = {
	'weeklyWeather': {},
	'location': {
		'city': '',
		'state': '',
	},
	'query': '',
	'searchTerm': 'Brooklyn',
};

//Reducer
export default function weather(state = initialState, action) {
	const newState = {...state};
	switch(action.type) {
		case FETCH_WEATHER:
			return	newState.weeklyWeather = action.val;
	    case FETCH_LOCATION:
			return newState.location = action.val;
	    case UPDATE_QUERY:
			return newState.query = action.val;
		case UPDATE_SEARCH_TERM:
			return newState.searchTerm = action.val;
	} 
	return newState;
}

//Create store
export const store = createStore(weather(), applyMiddleware(thunk));

//Actions
const FETCH_WEATHER = 'FETCH_WEATHER';
export const fetchWeather = (latitude, longitude) => dispatch => {
	const darkUrl = `https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/f8333dcfd78a8f0cfc293bdaaca7cdff/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags`;
		
	axios.get(darkUrl)
	.then(res => {
		var newWeeklyWeather = res.data.daily.data;
		dispatch({
			type: FETCH_WEATHER,
			val: {'weeklyWeather': newWeeklyWeather},
		});	
	},
	err => console.log(err)
	)
};

const FETCH_COORDINATES = 'FETCH_COORDINATES';
export const fetchCoordinates = (searchTerm) => dispatch => {
	var reGeocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${searchTerm ? searchTerm : this.state.searchTerm}`;

		axios.get(reGeocodeUrl)
		.then(res => {
			var newLatitude = res.data.results[0].locations[0].latLng.lat;
			var newLongitude = res.data.results[0].locations[0].latLng.lng;
			dispatch({
				type: FETCH_COORDINATES,
				val: {
					'latitude': newLatitude, 
					'longitude': newLongitude
				},
			});
		},
		err=>console.log(err)
		)
};

const FETCH_LOCATION = 'FETCH_LOCATION';
export const fetchLocation = (latitude, longitude) => dispatch => {
		var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${latitude},${longitude}`;

		axios.get(geocodeUrl)
		.then(res => {
			var city = res.data.results[0].locations[0].adminArea5;
			var state = res.data.results[0].locations[0].adminArea3;
			dispatch({ 
				type: FETCH_LOCATION, 
				val:{'location': {'city': city, 'state': state}}
			});
		},
		err=>console.log(err)
		)
};

const UPDATE_QUERY = 'UPDATE_QUERY';
export const updateQuery = (input) => (
	{ type: UPDATE_QUERY, val: input}
);

const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
export const updateSearchTerm = () => (
	{ type: UPDATE_SEARCH_TERM, val:''}
);