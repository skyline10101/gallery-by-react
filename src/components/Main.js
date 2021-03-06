require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';

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

function getRangeRandom(low, high){
  return Math.ceil(Math.random() * (high - low) + low);
}

/*
 *  获取0-30度任意一个度数正负值
 */
function get30DegRandom(){
  return (Math.random() > 0.5? '' : '-') + Math.ceil(Math.random()*30);
}

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
    
    
    // 初始化state，图片的left、top位置
    this.state = {
      imgsArrangeArr: [
        // {
           // pos:{
           //   left: 0,
           //   top: 0
           // },
        //   rotate: 0,   // 图片的旋转角度
        //   isInverse: false   // 设置图片是否翻转的状态
        //   isCenter: false   // 默认图片不居中
        // }
      ]
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
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil( imgW / 2),
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

  /*
   *  翻转图片
      @ param index 输入当前被执行inverse操作执行的图片对应的图片数组信息的index值
      @ return {Function}  这是一个闭包函数，其内return一个待被执行的函数
   */
  inverse(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });

    }.bind(this);
  }

  /*
   *  利用rearrange函数居中相应index的图片
   */

  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }


  //重新布局所有图片
  rearrange (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor((Math.random()*2)),//取一个或不取

        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //首先居中centerIndex图片，居中的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos : centerPos,
          rotate : 0,
          isCenter:true
        };

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index] = {
            pos:{
              top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false
          };
        });

        //布局两侧图片
        for (var i = 0, j = imgsArrangeArr.length, k = j/2; i < j; i++) {
          var hPosRangeLOrRX = null;

          //前半部分布局左边，后半部分布局右边
          if(i < k){
            hPosRangeLOrRX = hPosRangeLeftSecX;
          } else {
            hPosRangeLOrRX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos : {
              top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left:getRangeRandom(hPosRangeLOrRX[0],hPosRangeLOrRX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false
          };
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
  }

  render() {

  	var controllerUnits = [],
  		imgFigures = [];

  	imageDatas.forEach(function(value,index){

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top :0
          },
          rotate : 0,
          isInverse : false,
          isCenter:false
        }
      }

      //加入key帮助react提升性能
  		imgFigures.push(
        <ImgFigure
          key={index}
          data={value}
          ref={'imgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index)}
        />
      );

      controllerUnits.push(
        <ControllerUnit
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index)}
        />
      );

      
  	}.bind(this));

    


    return (
     	<section className="stage" ref="stage">
     		
     		<section className='img-sec'>
				{imgFigures}
     		</section>
     		<nav className='controller-nav'>
				{controllerUnits}
     		</nav>
     	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
