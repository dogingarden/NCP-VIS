/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-20 09:16:55
 */
import messages from '../../messages'
import { injectIntl } from 'react-intl';
import React, { Component } from 'react';
import * as d3 from 'd3';
import Radial from './Radial';
import RadialMarker from './RadialMarker'


class RadialMap extends Component {
    // Setup default D3 objects
    // projection - defines our geo projection, how the map looks
    // geoPath - calculates d attribute of <path> so it looks like a map
    // quantize - threshold scale with 9 buckets
    
    constructor(props) {
        super(props);
        const { intl } = this.props
        this.formatMessage = intl.formatMessage
        // this.updateScale(this.props)
        this.outerRadius=0
        this.axes = [
            { 'label': '非常相似', 'value': 15 },
            { 'label': '相似', 'value': 30 },
            { 'label': '不同', 'value': 45 },
            { 'label': '非常不同', 'value': 60 },
            { 'label': '差异极大', 'value': 75} 
        ];
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { centerCity } = this.props
        const { width, height } = this.props
        return (centerCity !== nextProps.centerCity && (centerCity===null||nextProps.centerCity===null))||
                width !== nextProps.width
                || height !== nextProps.height;
    }
    updateScale(props){
        let max=d3.min([props.width / 2 - 90, props.height / 2 - 90])
        if(d3.min([props.width, props.height ])<900){
            max=d3.min([props.width / 2 - 20, props.height / 2 - 20])
        }
        const rl = d3.scaleLinear().domain([0, 75])
            .range([0, max])
        this.outerRadius=max
        this.arc = d3.arc()
            .outerRadius(function(d) { return rl(d.value); })
            .innerRadius(function(d) { return rl(d.value); })
            .startAngle(0)
            .endAngle(2 * Math.PI)
    }
    componentWillReceiveProps(newProps) {
        this.updateScale(newProps);
    }
    // If no data, do nothing (we might mount before data loads into props)
    render() {
            const { centerCity } = this.props
            let feature = { 
                'near': this.formatMessage(messages.near), 
                'far': this.formatMessage(messages.far),
                'distance':  this.formatMessage(messages.geoDistance),
                'value': 67.5
            }
            let feature2 = { 
                'near': this.formatMessage(messages.small), 
                'far': this.formatMessage(messages.big),
                'distance':  this.formatMessage(messages.valueDifference),
                'value': 67.5
            }
            if(centerCity===''||centerCity===null||centerCity===undefined){
                feature = { 
                    'near': '', 
                    'far': "",'distance': this.formatMessage(messages.provinceSort),
                    'value': 67.5
                }
                feature2 = { 
                    'near': this.formatMessage(messages.valueSmall), 
                    'far': this.formatMessage(messages.valueBig),
                    'distance': this.formatMessage(messages.valueName),
                    'value': 67.5
                }
            }
            
            this.updateScale(this.props)
            return (
                <g id="background-container" transform={`translate(${this.props.width/2}, ${this.props.height/2})`}>
                    {this.axes.map((feature,id) => (
                        <Radial arc={this.arc}
                                feature={feature}
                                index={id}
                                key={id} 
                                />
                     ))}
                    <RadialMarker
                        arc={this.arc}
                        outerRadius={this.outerRadius}
                        {...{feature, feature2}}
                    />
                     
                </g>
            );
        
    }
}

export default injectIntl(RadialMap)
