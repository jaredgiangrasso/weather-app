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

//
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const fetchWeather = (latitude, longitude) => dispatch => {

	//darksky URL appended to heroku CORS anywhere to proxy call and avoid CORS error
	const darkUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f8333dcfd78a8f0cfc293bdaaca7cdff/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags`;
		
		axios.get(darkUrl)
		.then(res => {

			//update store with location weather
			var newWeeklyWeather = res.data.daily.data;
			dispatch({type: FETCH_WEATHER, val: newWeeklyWeather});

			//get location name based on lat/long
			var geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/reverse?key=BItCZXXNbczFUj0Dd7g6GiQ8AxTmxC77&location=${latitude},${longitude}`;
			return axios.get(geocodeUrl);
		})

		//update store with location name
		.then(res => {
			var city = res.data.results[0].locations[0].adminArea5;
			var state = res.data.results[0].locations[0].adminArea3;
			dispatch({type: FETCH_LOCATION, val: {'city': city, 'state': state}});
		})
		.catch(err=>console.log(err));
}

//to be used by fetchWeather with location information supplied for val
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const fetchLocation = () => (
	{type: FETCH_LOCATION, val: ''}
)

//update query on input change
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const updateQuery = (input) => (
	{type: UPDATE_QUERY, val: input}
)
