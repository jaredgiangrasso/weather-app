import weather from './reducers.js';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Create initial state
export const initialState = {
	'weeklyWeather': {},
	'location': {
		'city': '',
		'state': '',
	},
	'query': '',
};

//Create store
export const store = createStore(weather, applyMiddleware(thunk));

//Actions
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const fetchWeather = (latitude, longitude) => dispatch => {

	const darkUrl = `https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/f8333dcfd78a8f0cfc293bdaaca7cdff/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags`;
		
		axios.get(darkUrl)
		.then(res => {
			var newWeeklyWeather = res.data.daily.data;
			dispatch({type: FETCH_WEATHER, val: newWeeklyWeather});

			var geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/reverse?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${latitude},${longitude}`;
			return axios.get(geocodeUrl);
		})
		.then(res => {
			var city = res.data.results[0].locations[0].adminArea5;
			var state = res.data.results[0].locations[0].adminArea3;
			dispatch({type: FETCH_LOCATION, val: {'city': city, 'state': state}});
		})
		.catch(err=>console.log(err));
}

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const fetchLocation = () => (
	{type: FETCH_LOCATION, val: ''}
)

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const updateQuery = (input) => (
	{type: UPDATE_QUERY, val: input}
)
