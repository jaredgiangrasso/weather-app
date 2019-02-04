export const ADD_WEATHER = 'ADD_WEATHER';

export function addWeather (weeklyWeather) {
	return { type: ADD_WEATHER, weeklyWeather}
} 