import React from 'react';

class ImgFigure extends React.Component {
	render (){

		var styleObj = {};
		// 如果props中指定了这张图片的位置则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值并且不为零，添加旋转角度
		if(this.props.arrange.rotate){
			(['-moz-','-ms-','-webkit-','']).forEach(function(value){
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate +'deg)';
			}.bind(this));
			
		}

		return (
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

export default ImgFigure;
