/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-16 16:32:11
 */

import React, { Component } from 'react';
import * as d3 from 'd3';
import Radial from './Radial';


class RadialMap extends Component {
    // Setup default D3 objects
    // projection - defines our geo projection, how the map looks
    // geoPath - calculates d attribute of <path> so it looks like a map
    // quantize - threshold scale with 9 buckets
    
    constructor(props) {
        super(props);
        this.axes = [
            { 'label': '非常相似', 'value': 15 },
            { 'label': '相似', 'value': 30 },
            { 'label': '不同', 'value': 45 },
            { 'label': '非常不同', 'value': 60 },
            { 'label': '差异极大', 'value': 75} 
        ];
        // this.updateScale(this.props)
        

    }
    updateScale(props){
        let max=d3.min([props.width / 2 - 90, props.height / 2 - 90])
        if(d3.min([props.width, props.height ])<900){
            max=d3.min([props.width / 2 - 20, props.height / 2 - 20])
        }
        const rl = d3.scaleLinear().domain([0, 75])
            .range([0, max])

        this.arc = d3.arc()
            .outerRadius(function(d) { return rl(d.value); })
            .startAngle(0)
            .endAngle(2 * Math.PI)
    }
    componentWillReceiveProps(newProps) {
        this.updateScale(newProps);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { width, height } = this.props
        return width !== nextProps.width || height !== nextProps.height
    }
    

    // If no data, do nothing (we might mount before data loads into props)
    render() {
            // const { width, height } = this.props
            this.updateScale(this.props)
            return (
                <g transform={`translate(${this.props.width/2}, ${this.props.height/2})`}>
                    {this.axes.map((feature,id) => (
                        <Radial arc={this.arc}
                                feature={feature}
                                index={id}
                                key={id} 
                                // {...{width,height}}
                                />
                     ))}

                     
                </g>
            );
        
    }
}

export default RadialMap;
