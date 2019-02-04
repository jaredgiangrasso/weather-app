import React, { Component } from 'react';
import Search from './Search.js';

class Location extends Component {
	render(){
		return(
			<div id='location'>
				<Search handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} city={this.props.city} state={this.props.state}/>
			</div>
		)
	}
}

export default Location;