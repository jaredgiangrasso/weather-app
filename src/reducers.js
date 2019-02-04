function weatherUpdate(state, action) {
	switch(action.type) {
		case ADD_WEATHER:
			return Object.assign({}, state, {
				
			})
		default:
			return state;
	}
}