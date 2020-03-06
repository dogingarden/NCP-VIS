/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-21 00:37:22
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-06 17:13:59
 */
import React, { Component } from 'react';
import SliderWrapper from './SliderWrapper'
import * as d3 from 'd3'
import { sliderBottom } from './d3-slider';
import { getTimelineData } from 'utils/utils'

class Slider extends Component {
  constructor() {
    super();
    
    this.state = {

    };
    this.ifInit = false
  }
  componentDidMount(){
    const { centerCity, dataType, allData }=this.props
    const timelineData = getTimelineData(centerCity, dataType, allData)
    this.initChart(timelineData)
  }
  componentWillReceiveProps(newProps) {
    const {centerCity, dataType, allData}=this.props
    if(centerCity !==newProps.centerCity ||
      dataType!==newProps.dataType){
        console.log(newProps.centerCity)
        const timelineData = getTimelineData(newProps.centerCity, newProps.dataType, allData)
        this.drawChart(timelineData)
      }
  }
  initChart(timelineData){
    // const { percent, color, timelineData } = newProps
    var width = 220;
    var height = 100;
    var margin = { top: 30, right: 20, bottom: 30, left:20 };
    var parseTime = d3.timeParse("%Y-%m-%d");
    timelineData.forEach(d=>{
      d.date = parseTime(d.date);
      d.value = +d.value;
    })
    var svg = d3
      .select('#slider-timeline')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    var padding = 0.1;

    var xBand = d3
      .scaleBand()
      .domain(timelineData.map(d => d.date))
      .range([margin.left, width - margin.right])
      .padding(padding);

    var xLinear = d3
      .scaleTime()
      .domain(d3.extent(timelineData, function(d) { return d.date; }))
      .range([
        margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
        width -
          margin.right -
          xBand.bandwidth() / 2 -
          xBand.step() * padding -
          0.5,
      ]);

    var y = d3
      .scaleLinear()
      .domain([0, d3.max(timelineData, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    var yAxis = g =>
      g
        .attr('transform', `translate(${width - margin.right},0)`)
        .call(
          d3
            .axisRight(y)
            .tickValues([1e4])
            .tickFormat(d3.format('($.2s'))
        )
        .call(g => g.select('.domain').remove());

    var slider = g =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        sliderBottom(xLinear)
          .step(1)
          .ticks(4)
          .default(9)
          .on('onchange', value => draw(value))
      );

    var bars = svg
      .append('g')
      .selectAll('rect')
      .data(timelineData);

    var barsEnter = bars
      .enter()
      .append('rect')
      .attr('x', d => {
        return xBand(d.date)
      })
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', xBand.bandwidth());

    svg.append('g').call(yAxis);
    svg.append('g').call(slider);

    var draw = selected => {
      barsEnter
        .merge(bars)
        .attr('fill', d => (d.date === selected ? '#bad80a' : '#e0e0e0'));

      // d3.select('p#value-new-york-times').text(
      //   d3.format('$,.2r')(dataNewYorkTimes[selected - 1].value)
      // );
    };

    draw(9);
  }
  render() {
    return (
      <SliderWrapper className="process" id="slider-timeline">
        
      </SliderWrapper>
    );
  }
}

export default Slider