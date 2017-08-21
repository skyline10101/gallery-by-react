import React from 'react';

class ImgFigure extends React.Component {
	/*
	 *	imgFigure的点击处理函数
	 */
	handleClick(e) {

		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else {
			this.props.center();
		}


		e.stopPropagation();
		e.preventDefault();
	}

	render (){

		var styleObj = {};
		// 如果props中指定了这张图片的位置则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}
		var imgFigureClassName = "img-figure";
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';


		//如果图片的旋转角度有值并且不为零，添加旋转角度
		if(this.props.arrange.rotate){
			(['-moz-','-ms-','-webkit-','']).forEach(function(value){
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate +'deg)';
			}.bind(this));
			
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11; 			
		}

		return (
			//onClick中一定要记得加入bind(this)
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick.bind(this)}>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		);
	}
}

export default ImgFigure;
