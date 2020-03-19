/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-03-07 10:07:34
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-19 23:59:16
 */
import React, { Component } from "react";
// import Switch from "react-switch";
import * as d3 from 'd3'
// import { FormattedMessage } from 'react-intl'
// import messages from '../messages'
import html2canvas from "html2canvas";

class Screenshot extends Component {


  handleClick() {
      d3.select("#svg-container").style("transform","translateY(0)")
      setTimeout(() => {
        html2canvas(document.getElementById("svg-container"), {
            // allowTaint: true,
            // width: window.innerWidth,
            // height: window.innerHeight,
            // scrollX: window.pageXOffset,
            // scrollY: window.pageYOffset,
            // x: window.pageXOffset,
            // y: window.pageYOffset
        })
        .then(canvas => {
            let a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'somefilename.jpg';
            a.click();
            d3.select("#svg-container").style("transform",'translateY(55px)')
            // this.props.onChangeCanvas(canvas);
            //
            // canvas.style.position = 'fixed';
            // canvas.style.top = '0';
            // canvas.style.left = '0';
            // canvas.style.opacity = '0';
            // canvas.style.transform = 'scale(0)';
            // canvas.style.zIndex = '99999999';
            // canvas.style.transition =
            //     'transform 0.3s cubic-bezier(0.42, 0, 0.58, 1),opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1),-webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1)';
        })
        .catch(e => {
            console.log(e);
        });
      },1000);
      

  }

  render() {
    return (
      <div className="screenshot-container">
        <button onClick={this.handleClick}>
          截图
          </button>
      </div>
    );
  }
}
export default Screenshot