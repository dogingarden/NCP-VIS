/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-16 16:31:29
 */

import React, { Component } from 'react';

const BlankColor = 'rgb(20,240,240)'
// const StrokeColor = 'rgb(174, 174, 174)'
const StrokeWidth = 1
// Combine array of colors and quantize scale to pick fill color
// Return a <path> element
class Radial extends Component {

    render() {
        const { arc, feature, index } = this.props;

        let color = BlankColor;
        // let stroke = StrokeColor;
        let lineWindth = StrokeWidth;


        return (
            <g>
                <path className="axispath"
                    d={arc(feature)} 
                    id={"axispath"+index}
                    style={{fill: "none",stroke: color}} 
                    strokeWidth={lineWindth} 
                    title={feature.label} />
                <text className="axislabel"
                    dy={-5}
                    dx={0}
                    style={{fill:"#000000"}}
                    textAnchor="middle"
                 >
                    <textPath 
                        xlinkHref={"#axispath" + index}
                        startOffset="90%"
                    >
                        {feature.label}
                    </textPath>
                </text>
            </g>
        );
    }
}

export default Radial;