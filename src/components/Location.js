import React from 'react';
import Search from './Search.js';

//render search bar and pass location information
let location = (props) => {
	return(
		<div id='location'>
			<Search handleSubmit={props.handleSubmit} handleChange={props.handleChange} city={props.city} state={props.state}/>
		</div>
	)
}

export default location;