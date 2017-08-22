import React from 'react';




class ControllerUnit extends React.Component {

	handleClick(e){

		e.preventDefault();
		e.stopPropagation();
	}

	render (){
		return (
			<span className="controller-unit" onClick={this.handleClick}></span>
		);
	}
}

export default ControllerUnit;