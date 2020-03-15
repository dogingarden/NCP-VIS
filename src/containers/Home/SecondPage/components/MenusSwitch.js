/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-03-07 10:07:34
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-14 21:29:58
 */
import React, { Component } from "react";
import Switch from "react-switch";
import * as d3 from 'd3'

class MenusSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    console.log(d3.select("#selectorcontainer"))
    if(!checked){
        d3.select("#selectorcontainer")
            .transition()
            .duration(300)
            .attr("opacity",0)
            .style("display","none")
        d3.select(".process-container")
            .transition()
            .duration(300)
            .attr("opacity",0)
            .style("display","none")
    }else{
        
        d3.select("#selectorcontainer")
          .style("display","block")
          .attr("opacity",0)
          .transition()
          .duration(300)
          .attr("opacity",1)
        d3.select(".process-container")
          .style("display","block")
          .attr("opacity",0)
          .transition()
          .duration(300)
          .attr("opacity",1)
    }
      
    this.setState({ checked });
  }

  render() {
    return (
      <div className="switch-container">
        {this.state.checked &&
            <span>隐藏菜单</span>
        }
        {!this.state.checked &&
            <span>显示菜单</span>
        }
        <Switch onChange={this.handleChange} checked={this.state.checked}
        uncheckedIcon={false}
        checkedIcon={false} />
      </div>
    );
  }
}
export default MenusSwitch