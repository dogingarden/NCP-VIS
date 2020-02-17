/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime : 2020-02-14 21:14:52
 */

import React, { Component } from 'react';
import _ from 'lodash';

const BlankColor = 'rgb(20,240,240)'
const StrokeColor = 'rgb(174, 174, 174)'
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

        return (
            <path d={geoPath(feature)} style={{fill: color,stroke: stroke}} strokeWidth={lineWindth} title={feature.id} />
        );
    }
}

export default County;
