require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ImgFigure from './ImgFigure';

//获取图片相关数据
let imageDatas = require('json!../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr){
	for (var i = 0,j = imageDataArr.length; i < j; i++) {
		var singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		singleImageData[i] = singleImageData;
	}

	return imageDataArr;
})(imageDatas);







class AppComponent extends React.Component {
  render() {

  	var controlerUnits = [],
  		imgFigures = [];

  	imageDatas.forEach(function(value){
  		imgFigures.push(<ImgFigure data={value}/>);
  	});


    return (
     	<section className="stage">
     		
     		<section className='img-sec'>
				{imgFigures}
     		</section>
     		<nav className='controler-nav'>
				{controlerUnits}
     		</nav>
     	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
