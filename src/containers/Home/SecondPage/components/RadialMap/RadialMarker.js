/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-11 13:39:53
 */

import React, { Component } from 'react'

const BlankColor = '#EDF6F7'//'#159BC9'//
const TextColor = 'rgb(174, 174, 174)'
const TextSize = 14
// const StrokeColor = 'rgb(174, 174, 174)'
const StrokeWidth = 1
// Combine array of colors and quantize scale to pick fill color
// Return a <path> element
class RadialMarker extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     const { feature } = this.props
    //     return feature.near !== nextProps.feature.near
    // }
    render() {
        const { arc, feature,feature2, outerRadius } = this.props;
        const markerArc = arc
            // .outerRadius(function(d) { return rl(67.5); })
            // .startAngle(0)
            .startAngle(Math.PI*3/4)
            .endAngle(Math.PI/2)
        let color = BlankColor
        let lineWindth = StrokeWidth
        return (
            <g>
                <path className="axispath"
                    d={markerArc(feature)} 
                    id={"axispath"}
                    style={{fill: "none",stroke: color}} 
                    strokeWidth={lineWindth} 
                    title={feature.label1} />
                    
                <line x1="0" y1="0" x2={outerRadius/5*3} y2="0"
                    strokeDasharray="4" 
                    style={{fill: "none",stroke: color}} 
                    strokeWidth={lineWindth} />
                    
                <path d={`M${outerRadius/5*2} 0 L${outerRadius} 0 Z`}
                    // strokeDasharray="4" 
                    id={"axispath-value"}
                    style={{fill: "none",stroke: color}} 
                    strokeWidth={lineWindth} />
                <g>
                    <text className="axislabel"
                        dy={-5}
                        dx={0}
                        style={{fill:TextColor}}
                        textAnchor="middle"
                        fontSize={TextSize}
                    >
                        <textPath 
                            xlinkHref={"#axispath-value"}
                            startOffset="2%"
                        >
                            {feature2.near}
                        </textPath>
                    </text>
                    <text className="axislabel"
                        dy={-5}
                        dx={0}
                        style={{fill:TextColor}}
                        fontSize={TextSize}
                        textAnchor="middle"
                    >
                        <textPath 
                            xlinkHref={"#axispath-value"}
                            startOffset="48%"
                        >
                            {feature2.far}
                        </textPath>
                    </text>
                    <text className="axislabel"
                        dy={-5}
                        dx={0}
                        style={{fill:TextColor}}
                        fontSize={TextSize}
                        textAnchor="middle"
                        letterSpacing="2"
                    >
                        <textPath 
                            xlinkHref={"#axispath-value"}
                            startOffset="25%"
                        >
                            {feature2.distance}
                        </textPath>
                    </text>
                </g>
                <text className="axislabel"
                    dy={-5}
                    dx={0}
                    style={{fill:TextColor}}
                    textAnchor="middle"
                    fontSize={TextSize}
                 >
                    <textPath 
                        xlinkHref={"#axispath"}
                        startOffset="96%"
                    >
                        {feature.near}
                    </textPath>
                </text>
                <text className="axislabel"
                    dy={-5}
                    dx={0}
                    style={{fill:TextColor}}
                    fontSize={TextSize}
                    textAnchor="middle"
                 >
                    <textPath 
                        xlinkHref={"#axispath"}
                        startOffset="3%"
                    >
                        {feature.far}
                    </textPath>
                </text>
                <text className="axislabel"
                    dy={-5}
                    dx={0}
                    style={{fill:TextColor}}
                    fontSize={TextSize}
                    textAnchor="middle"
                    letterSpacing="2"
                 >
                    <textPath 
                        xlinkHref={"#axispath"}
                        startOffset="50%"
                    >
                        {feature.distance}
                    </textPath>
                </text>
            </g>
        );
    }
}

export default RadialMarker
