import React from 'react';




class ControllerUnit extends React.Component {

	handleClick(e){

		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		e.preventDefault();
		e.stopPropagation();
	}

	render (){
		var controllerUnitClassName = 'controller-unit';
		if (this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center';

			if (this.props.arrange.isInverse) {
				controllerUnitClassName += ' is-inverse';
			}
		}

		return (
			<span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
		);
	}
}

export default ControllerUnit;