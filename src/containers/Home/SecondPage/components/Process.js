/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-21 00:37:22
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-21 22:51:59
 */
import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line } from 'rc-progress';
import ProcessWrapper from './ProcessWrapper'
import { ReactComponent as Pause } from './icons/pause.svg';
import { ReactComponent as Play } from './icons/play.svg';

function Greeting(props) {
  const {text,onHandlePlay,onHandlePause} = props;
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
      text:"播放"
    };
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

  timer=()=> {
    const { dates, selectDate,selectedDate }=this.props
    // const { text } = this.state
    let currentIndex = dates.indexOf(selectedDate) 
    let datePrecent = ( currentIndex + 1 )/dates.length*100
    
    if(currentIndex===dates.length-1){
      clearInterval(this.countdown);
      this.setState({ text:"播放" });
    } else {
      selectDate( dates[currentIndex+1] )
      this.setState({ percent: datePrecent });
    }
    
    
  }

  render() {
    const { color, text } = this.state;
    const { dates, selectedDate }=this.props
    // const { text } = this.state
    let currentIndex = dates.indexOf(selectedDate) 
    let datePrecent = ( currentIndex + 1 )/dates.length*100
    const containerStyle = {
      width: '240px',
    };    
    return (
      <ProcessWrapper className="process">
        {/* <p className="button">
          <button type="button" onClick={ this.onHandleClick }>
            {text}
          </button>
        </p> */}
        <div className="button">
          <Greeting className="icons" text={text} onHandlePlay={this.onHandlePlay} onHandlePause={this.onHandlePause}/>
        </div>
        <div style={containerStyle} className="bar">
          <Line percent={datePrecent} strokeWidth="4" strokeColor={color} />
        </div>
        
      </ProcessWrapper>
    );
  }
}

export default Process