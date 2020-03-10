/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-10 12:40:46
 */

import React, { Component } from 'react';

const BlankColor = '#cfcfcf'
const StrokeColor = '#E5E5E3'
const StrokeWidth = 1
// Combine array of colors and quantize scale to pick fill color
// Return a <path> element
class County extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     const { zoom, value } = this.props;

    //     return zoom !== nextProps.zoom
    //         || value !== nextProps.value;
    // }
    shouldComponentUpdate(nextProps, nextState) {
        const { width, height } = this.props
        return width !== nextProps.width
            || height !== nextProps.height;
    }
    render() {
        const { value, geoPath, feature } = this.props;

        let color = BlankColor;
        let stroke = StrokeColor;
        let lineWindth = StrokeWidth;
        if (value) {
            // color = ChoroplethColors[quantize(value)];
            color="#ffffff"
        }
        if(feature.properties.name!=="九段线"){
            return (
                <path d={geoPath(feature)} style={{fill: color,stroke: stroke}} strokeWidth={lineWindth} title={feature.id} />
            );
        }else{
            return (
                <path d={geoPath(feature)} stroke= {"rgb(174, 174, 174)"} style={{fill: "rgb(121, 116, 116)",stroke: "rgb(121, 116, 116)"}} strokeWidth={2} title={feature.id} />
            );
        }
    }
}

export default County;
