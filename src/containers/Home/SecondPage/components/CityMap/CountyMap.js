/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-19 23:20:20
 */

import React, { Component } from 'react';
import * as d3 from 'd3';


import County from './County';


class CountyMap extends Component {
    
    constructor(props) {
        super(props);
        this.updateD3(this.props);
    }

    // update D3 objects when props update
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
    
    // Re-center the geo projection
    // Update domain of quantize scale
    updateD3(props) {
        const {chinaTopoJson,width,height}=props
        
        this.projection = d3.geoMercator()
            .scale(1)
            .translate([0, 0]);

        this.areas = chinaTopoJson.features;
        this.border = chinaTopoJson.features;
        this.path = d3.geoPath().projection(this.projection);

        //确定边界，左上与右下 坐标
        let b = this.path.bounds(chinaTopoJson);
        //选出高和宽之中占比大的那个。
        this.s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        this.t = [(width - this.s * (b[1][0] + b[0][0])) / 2, (height - this.s * (b[1][1] + b[0][1])) / 2*1];

        this.projection = d3.geoMercator()
            .scale(this.s)
            .translate(this.t);
        this.geoPath = d3.geoPath()
            .projection(this.projection);
        
    }

    // If no data, do nothing (we might mount before data loads into props)
    render() {
        const {width,height}=this.props
        if (!this.props.chinaTopoJson) {
            return null;
        }else{
            // Translate topojson data into geojson data for drawing
            // Prepare a mesh for states and a list of features for counties
            const china = this.props.chinaTopoJson,
                counties = china.features

            // Loop through counties and draw <County> components
            // Add a single <path> for state borders
            return (
                <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                    {counties.map((feature) => (
                        <County geoPath={this.geoPath}
                                feature={feature}
                                key={feature.properties.name} 
                                {...{width,height}}
                                />
                     ))}

                     
                </g>
            );
        }
    }
}

export default CountyMap;
