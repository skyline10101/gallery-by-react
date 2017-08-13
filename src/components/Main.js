require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
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

  constructor(props) {
    super(props);

     this.Constant = {
      centerPos:{
        left:0,
        top:0
      },
      hPosRange : {//水平方向取值范围
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{//垂直方向取值范围
        x:[0,0],
        topY:[0,0]
      }
    }

  }
 

  //组件加载后为每张图片初始化范围
  componentDidMount(){
    //拿到舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        //scrollWidth是对象的实际宽度，不包含滚动条等边线宽度，会随对象中内容可视区域超过边线内容而扩大；
        //clientWidth是对象内容的可视区域内容，不包含滚动条等边线，会随对象显示大小改变
        //offsetWidth是对象整体实际宽度，包含滚动条等边线，会随对象显示大小变化而改变
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil( stageW / 2),
        halfStageH = Math.ceil( stageH / 2);

    //拿到一个imgFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollheight,
        halfImgW = Math.ceil( imgH / 2),
        halfImgH = Math.ceil( imgH / 2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left : halfStageW - halfImgW,
      top : halfStageH - halfImgH
    }

    //计算左侧右侧区域范围
    this.Constant.hPosRange.leftSecX[0] = - halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  //重新布局所有图片
  rearrange (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSec = hPosRange.leftSecX,
        hPosRangeRightSec = hPosRange.RightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil((Math.random()*2))，//取一个或不取

        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //居中


  }

  getInitialState(){
    return {
      imgsArrangeArr : [
        {
          pos:{
            left:'0',
            top:''
          }
        }
      ]
    };
  }



  render() {

  	var controlerUnits = [],
  		imgFigures = [];

  	imageDatas.forEach(function(value,index){

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top :0
          }
        }
      }

  		imgFigures.push(<ImgFigure data={value} ref={"imgFigure" + index}/>);
  	}.bind(this));


    return (
     	<section className="stage" ref="stage">
     		
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
