import React, { Component } from 'react';
import magnifying from './Images/Magnifying.svg';
import './Search.css'

class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: ''
		};

	this.passChange = this.passChange.bind(this);
	this.passSubmit = this.passSubmit.bind(this);
	}

	passChange(event){
		var newQuery = event.target.value;
		this.setState({value: event.target.value});
		this.props.handleChange(newQuery);
	}

	clearForm(event) {
		this.setState({value: ''});
		event.target[0].blur();
	}

	passSubmit(event){
		event.preventDefault();
		this.props.handleSubmit();
		this.clearForm(event);
	}

	render() {
		var location = `${this.props.city}, ${this.props.state}`;
		return (
			<div>
				<label htmlFor='searchbar'>
					<img alt='magnifying glass' id='search' src={magnifying}/>
				</label>
				<form onSubmit={this.passSubmit} name='searchbar'>
					<input id='searchbar' type='text' autoComplete='off' value={this.state.value} placeholder={location} onChange={this.passChange}/>
				</form>
			</div>
		)
	}
}

export default Search;