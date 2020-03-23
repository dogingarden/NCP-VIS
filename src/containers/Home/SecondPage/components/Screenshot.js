/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-03-07 10:07:34
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-23 12:04:24
 */
import React, { Component } from "react";
// import Switch from "react-switch";
import * as d3 from 'd3'
// import { FormattedMessage } from 'react-intl'
// import messages from '../messages'
import html2canvas from "html2canvas";
import QR from './icons/QR.png'; // Tell webpack this JS file uses this image
// import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import { injectIntl } from 'react-intl'

class Screenshot extends Component {
  constructor(props) {
    super(props);
    const { intl } = this.props
    this.formatMessage = intl.formatMessage
  }
  getSelectedCityInfo(city, data, type) {
    const locale = this.props.intl.locale
    
    let showType = ''
    // eslint-disable-next-line default-case
    switch (type) {
      case "POP":
        showType=this.formatMessage(messages.population)
        break;
      case "GDP":
        showType=this.formatMessage(messages.GDP)
        break;
      case "city_confirmedCount":
        showType=this.formatMessage(messages.confirmed)
        break;
      case "city_curedCount":
        showType=this.formatMessage(messages.cured)
        break;
      case "city_deadCount":
        showType=this.formatMessage(messages.dead)
        break;
      case "hospital":
        showType=this.formatMessage(messages.hospital)
        break;
      case "bed":
        showType=this.formatMessage(messages.bed)
        break;
      case "doctor":
        showType=this.formatMessage(messages.doctor)
        break;
      case "day_inc":
        showType=this.formatMessage(messages.newlyConfirmed)
        break;
      case "day_now_confirm":
        showType=this.formatMessage(messages.exitingConfirmed)
        break;
    }
    
    
    let selectItem={ name: locale === 'zh'?"全国":"Nationwide", value: ' ',unit:' ' ,type: showType}
    if(city===null){
      return selectItem
    }
    
    if (locale === 'zh') {
      data.forEach(d => {
        if (d.city === city) {
          selectItem = { name: d.city, value: Math.round(d[type]), type:showType}
        }
      })
    } else {
      data.forEach(d => {
        if (d.city === city) {
          selectItem = { name: d.en, value:Math.round( d[type]), type:showType}
        }

      })
    }
    let unit = ''
    // eslint-disable-next-line default-case
    switch (type) {
      case "POP":
        unit = this.formatMessage(messages.unitWan)
        if (locale === 'zh') {

        } else {
          selectItem.value = Math.round(selectItem.value * 10)
        }
        break;
      case "GDP":
        unit = this.formatMessage(messages.unitYi)
        if (locale === 'zh') {
        } else {
          selectItem.value = Math.round(selectItem.value / 10)
        }
        break;
      case "city_confirmedCount":
        unit = this.formatMessage(messages.unitRen)
        break;
      case "city_curedCount":
        unit = this.formatMessage(messages.unitRen)
        break;
      case "city_deadCount":
        unit = this.formatMessage(messages.unitRen)
        break;
      case "hospital":
        unit = this.formatMessage(messages.unitGe)
        break;
      case "bed":
        unit = this.formatMessage(messages.unitZhang)
        break;
      case "doctor":
        unit = this.formatMessage(messages.unitWei)
        break;
      case "day_inc":
        unit = this.formatMessage(messages.unitRen)
        break;
      case "day_now_confirm":
        unit = this.formatMessage(messages.unitWei)
        break;
      default:
        unit = ''
    }
    selectItem.unit = unit
    return selectItem
  }
  handleClick = () => {
    const { centerCity, selectedDate, dataType, citiesData } = this.props
    let cityInfo=this.getSelectedCityInfo(centerCity,citiesData,dataType)

    
    //1获取长宽的最小值以及长宽信息
    const svg = d3.select("#svg-container")
      .select("svg")
    const svgWidth = +svg.attr("width")
    const svgHeight = +svg.attr("height")
    //判断是否移动位置
    if(svgWidth<900){
      d3.select("#svg-container").style("transform", "translateY(0)")
    }
      
    //2添加文字描述
    let topCont = d3.select("#svg-container").append("div")
      .attr("class", "temp-text top-cont")
      .style("height", `${(svgHeight - svgWidth) / 2}px`)
    let bottomCont = d3.select("#svg-container").append("div")
      .attr("class", "temp-text bottom-cont")
      .style("height", `${(svgHeight - svgWidth) / 2}px`)
    let fontSize=10
    if( svgHeight > svgWidth ){
      fontSize = svgWidth / 12
    }else{
      fontSize = (svgWidth - svgHeight) / 10
    }
    
    topCont
        .append('div')
        .attr("class", "temp-date")
        .style("font-size", `${fontSize}px`)
        .style("left", `${0}px`)
        .style("top", `${0}px`)
        .text(() => {
          return `${selectedDate}`
        })
    topCont
        .append('div')
        .attr("class", "temp-name")
        .style("font-size", `${fontSize}px`)
        .style("left", `${0}px`)
        .style("top", `${(svgHeight - svgWidth) / 4}px`)
        .text(() => {
          return `${cityInfo.name}`
        })

    topCont
        .append('div')
        .attr("class", "temp-type-num")
        .style("font-size", `${fontSize}px`)
        .style("left", `${0}px`)
        .style("top", `${0}px`)
        .text(() => {
          return cityInfo.type+cityInfo.value+cityInfo.unit
        })
    bottomCont
        .append('div')
        .attr("class", "temp-image")
        .style("left", `${0}px`)
        .style("top", `${(svgHeight - svgWidth) / 4}px`)
        .append("img")
        .attr("src", QR)
        .attr("width", fontSize*2)
        .attr("height", fontSize*2)

    
    setTimeout(() => {
      var svgElem = document.getElementsByTagName("svg-container");
      for (const node of svgElem) {
        node.setAttribute("font-family", window.getComputedStyle(node, null).getPropertyValue("font-family"));
        node.replaceWith(node);
      }
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
          if(svgWidth<900){
            d3.select("#svg-container").style("transform", 'translateY(55px)')
          }
          
          d3.select("#svg-container").selectAll(".temp-text").remove()
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
    }, 1000);


  }

  render() {
    return (
      <div className="screenshot-container" >
        <div id="tryhtml2canvas" className="css-1xamfmm" onClick={this.handleClick}>
          <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMuMiIvPgogICAgPHBhdGggZD0iTTkgMkw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJIOXptMyAxNWMtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=" alt="Try html2canvas" className="css-1bgbwga" />
        </div>
      </div>
    );
  }
}
export default injectIntl(Screenshot)