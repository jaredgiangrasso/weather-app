import { FETCH_LOCATION, FETCH_WEATHER, UPDATE_QUERY, initialState } from './actions.js';

//Reducer
export default function weather(state = initialState, action) {

	switch(action.type) {
		case FETCH_WEATHER:
			return	Object.assign({}, state, {
				weeklyWeather: action.val
			})
	    case FETCH_LOCATION:
			return	Object.assign({}, state, {
				location: {city: action.val.city, state: action.val.state}
			})
	    case UPDATE_QUERY:
			return	Object.assign({}, state, {
				query: action.val
			})
	} 
	return state;
}