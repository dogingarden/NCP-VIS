/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-21 00:37:22
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-16 23:06:17
 */
import React, { Component } from 'react';
import SliderWrapper from './SliderWrapper'
import * as d3 from 'd3'
import { sliderBottom } from './d3-slider';
import { getTimelineData } from 'utils/utils'
const normalColor="rgb(229, 229, 227)"

class Slider extends Component {
  constructor() {
    super();
    
    this.state = {

    };
    this.ifInit = false
    this.timeline = null
    this.bars=null
    this.barsEnter=null
    this.xBand=null
    this.y=null
    this.container=null
    this.xLinear=null
  }
  componentDidMount(){
    const { centerCity, dataType, allData }=this.props
    const timelineData = getTimelineData(centerCity, dataType, allData)
    this.initChart(timelineData)
  }
  componentWillReceiveProps(newProps) {
    const {centerCity, dataType, allData, selectedDate}=this.props
    if(centerCity !==newProps.centerCity ||
      dataType!==newProps.dataType){
        const timelineData = getTimelineData(newProps.centerCity, newProps.dataType, allData)
        this.updateChart(timelineData,newProps.selectedDate,newProps.centerCity)
      }
      if(selectedDate!==newProps.selectedDate){
        this.updateDate(newProps.selectedDate)
      }
  }
  updateDate(nextDate){
    var parseTime = d3.timeParse("%Y-%m-%d");
    this.timeline.updateHandle(parseTime(nextDate))
    this.updateBars(parseTime(nextDate))
  }
  
  initChart(timelineData){
    // const { percent, color, timelineData } = newProps
    const { selectedDate }=this.props
    var width = 300;
    var height = 100;
    var margin = { top: 10, right: 50, bottom: 50, left:20 };
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
            .tickValues([d3.max(timelineData, d => d.value)])
            .tickFormat(d3.format('~s'))
        )
        .call(g => g.select('.domain').remove());
        
    this.timeline=sliderBottom(xLinear)
      .step(timelineData[1].date-timelineData[0].date)
      .ticks(4)
      .tickFormat(d3.timeFormat('%m-%d'))
      .default(parseTime(selectedDate))
      .on('onchange', value => this.handleSliderMove(value))

    var slider = g =>
      g.attr('transform', `translate(0,${height - margin.bottom + 2})`).call(
        this.timeline
      );
    this.container=svg
      .append('g')
    this.bars = this.container
      .selectAll('rect')
      .data(timelineData);

    this.barsEnter = this.bars
      .enter()
      .append('rect')
      .attr('x', d => {
        return xBand(d.date)
      })
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', xBand.bandwidth());

    svg.append('g').attr("class", "max-y").call(yAxis);
    svg.append('g').call(slider);
    
    this.updateBars(timelineData[0].date)
    this.xLinear = xLinear
    this.xBand=xBand
    this.y=y
  }
  handleSliderMove(date){
    const { selectedDate,selectDate }=this.props
    
    if(date!==selectedDate){
      //识别是拖拽还是自动播放，若是拖拽进行更新系统日期的操作
      let dateStr=d3.timeFormat('%Y-%m-%d')(date)
      selectDate(dateStr)
    }
    this.updateBars(date)
  }
  updateBars = (selected) => {
    const format=d3.timeFormat('%m-%d')
    this.barsEnter
      .merge(this.bars)
      .attr('fill', d => {
        return (format(d.date) === format(selected) ? '#FCD40D' : normalColor)
      })
  }
  updateChart(timelineData,selectedDate,centerCity){
    
    const parseTime = d3.timeParse("%Y-%m-%d");
    const format=d3.timeFormat('%m-%d')

    timelineData.forEach(d=>{
      d.date = parseTime(d.date);
      d.value = +d.value;
    })

    this.xBand.domain(timelineData.map(d => d.date))
    this.xLinear.domain(d3.extent(timelineData, function(d) { return d.date; }))
    this.y.domain([0, d3.max(timelineData, d => d.value)])

    var yAxis = g =>
      g
        .call(
          d3
            .axisRight(this.y)
            .tickValues([d3.max(timelineData, d => d.value)])
            .tickFormat(d3.format('.2s'))
        )
        .call(g => g.select('.domain').remove()
      );

    if(centerCity===null){
      d3.select("#slider-timeline")
        .select(".max-y")
        // .selectAll()
        .transition()
        .duration(300)
        .attr("opacity",0)
    }else{
      d3.select("#slider-timeline")
        .select(".max-y")
        .transition()
        .duration(300)
        .attr("opacity",1)
        .call(yAxis)
    }
    this.bars = this.container
      .selectAll('rect')
      .data(timelineData);
    this.barsEnter = this.bars
      .enter()
      .append('rect')
    
    this.bars.exit().remove()

    this.barsEnter
      .merge(this.bars)
      .transition()
      .duration(300)
      .attr('x', d => {
        return this.xBand(d.date)
      })
      .attr('y', d => this.y(d.value))
      .attr('height', d => this.y(0) - this.y(d.value))
      .attr('width', this.xBand.bandwidth())
      .attr('fill', d => {
        return (format(d.date) === format(parseTime(selectedDate)) ? '#FCD40D' : normalColor)
      })
  }
  render() {
    return (
      <SliderWrapper className="process" id="slider-timeline">
        
      </SliderWrapper>
    );
  }
}

export default Slider