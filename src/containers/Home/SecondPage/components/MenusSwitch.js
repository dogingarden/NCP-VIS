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
            // .on("end",()=>{
            //     d3.select(this).style("display","none")
            // })
    }else{
        
        d3.select("#selectorcontainer")
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