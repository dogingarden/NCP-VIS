/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-21 00:37:22
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-06 17:05:05
 */
// import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
// import { Line } from 'rc-progress';
import Slider from './ProcessChart/Slider'
import ProcessWrapper from './ProcessWrapper'
import { ReactComponent as Pause } from './icons/pause.svg';
import { ReactComponent as Play } from './icons/play.svg';


function Greeting(props) {
  const { text, onHandlePlay, onHandlePause } = props;
  if (text==="播放") {
    return <Play onClick={ onHandlePlay }/>
  }
  return <Pause onClick={ onHandlePause }/>
}

class Process extends Component {
  constructor() {
    super();
    
    this.state = {
      percent: 0,
      color: 'rgb(24, 86, 163)',
      text: "播放",
      
    };
    this.stateCitiesData = ''
    this.stateDataType = ''
    this.timelineData = []
    this.updateTimeline = false
    // this.changeState = this.changeState.bind(this);
  }
  onHandlePlay=()=>{
    this.countdown = setInterval(this.timer, 1000);
    this.setState({
      text: "暂停"
    });
  }
  onHandlePause=()=>{
    clearInterval(this.countdown);
    this.setState({
      text: "播放"
    });
    
  }
  componentDidMount() {
    // this.countdown = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }
  // componentWillUpdate(){
    
  //   const { centerCity, dataType, allData }=this.props
  //   const { stateDataType, stateCenterCity }=this
  //   if(dataType !== stateDataType || centerCity !== stateCenterCity){
  //     this.timelineData = getTimelineData(centerCity, dataType, allData)
  //     this.stateDataType = dataType
  //     this.stateCenterCity = centerCity
  //     this.updateTimeline = true
  //   }else{
  //     this.updateTimeline = false
  //   }
  // }
  timer=()=> {
    const { dates, selectDate, selectedDate }=this.props
    // const { text } = this.state
    let currentIndex = dates.indexOf(selectedDate) 
    let datePrecent = ( currentIndex ) / ( dates.length - 1 ) * 100
    //如果当前日期为最后一个，停止播放，重置按钮
    if(currentIndex===dates.length-1){
      clearInterval(this.countdown);
      this.setState({ text:"播放" });
    //否则，继续播放
    } else {
      selectDate( dates[currentIndex+1] )
      this.setState({ percent: datePrecent });
    }
  }

  render() {
    const { color, text } = this.state;
    const { dates, selectedDate, centerCity, dataType, allData }=this.props
    // const { updateTimeline, timelineData } = this
    let currentIndex = dates.indexOf(selectedDate) 
    let datePrecent = ( currentIndex )/(dates.length-1)*100
    const containerStyle = {
      width: '240px',
    };    
    // console.log(updateTimeline)
    return (
      <ProcessWrapper className="process">
        <div className="button">
          <Greeting className="icons" text={text} onHandlePlay={this.onHandlePlay} onHandlePause={this.onHandlePause}/>
        </div>
        <div style={containerStyle} className="bar">
          <Slider percent={datePrecent} color={color} {...{centerCity, dataType, allData}}/>
          {/* <Line percent={datePrecent} strokeWidth="4" strokeColor={color} /> */}
        </div>
      </ProcessWrapper>
    );
  }
}

export default Process