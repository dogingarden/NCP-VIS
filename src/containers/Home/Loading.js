/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-03-23 11:16:52
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-23 12:17:29
 */

import React, { Component } from 'react';

class Loading extends Component {
 
  render() {
    return (
        <div style={{padding: 'auto', background: '', display: 'block' ,top: '50%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
            style={{margin: 'auto', background: '', display: 'block' ,top: '50%',position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, -50%)'}}
            width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(53.9803 50 50)">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;90 50 50" 
            keyTimes="0;1" dur="1s" repeatCount="indefinite">
                </animateTransform><circle cx="50" cy="50" r="30" stroke="#49bd5a" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" 
                strokeLinecap="round" strokeWidth="10" transform="rotate(0 50 50)">
            <animate attributeName="stroke" values="#49bd5a;#fad547" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
            </circle><circle cx="50" cy="50" r="30" stroke="#fad547" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="10" transform="rotate(90 50 50)">
            <animate attributeName="stroke" values="#fad547;#df5c5c" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
            </circle><circle cx="50" cy="50" r="30" stroke="#df5c5c" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="10" transform="rotate(180 50 50)">
            <animate attributeName="stroke" values="#df5c5c;#2999cf" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
            </circle><circle cx="50" cy="50" r="30" stroke="#2999cf" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="10" transform="rotate(270 50 50)">
            <animate attributeName="stroke" values="#2999cf;#49bd5a" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
            </circle></g>
            </svg>
        </div>
    );
  }
}

export default Loading