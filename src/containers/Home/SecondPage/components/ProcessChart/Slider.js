/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-21 00:37:22
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-05 23:26:22
 */
import React, { Component } from 'react';
import SliderWrapper from './SliderWrapper'
import * as d3 from 'd3'
import { sliderBottom } from './d3-slider';

class Slider extends Component {
  constructor() {
    super();
    
    this.state = {

    };
  }
  componentDidMount(){
    
    // New York Times
    var width = 565;
    var height = 120;
    var margin = { top: 20, right: 50, bottom: 50, left: 40 };

    var dataNewYorkTimes = d3.range(1, 41).map(d => ({
      year: d,
      value: 10000 * Math.exp(-(d - 1) / 40),
    }));

    var svg = d3
      .select('#slider-new-york-times')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    var padding = 0.1;

    var xBand = d3
      .scaleBand()
      .domain(dataNewYorkTimes.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(padding);

    var xLinear = d3
      .scaleLinear()
      .domain([
        d3.min(dataNewYorkTimes, d => d.year),
        d3.max(dataNewYorkTimes, d => d.year),
      ])
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
      .domain([0, d3.max(dataNewYorkTimes, d => d.value)])
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
      .data(dataNewYorkTimes);

    var barsEnter = bars
      .enter()
      .append('rect')
      .attr('x', d => xBand(d.year))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', xBand.bandwidth());

    svg.append('g').call(yAxis);
    svg.append('g').call(slider);

    var draw = selected => {
      barsEnter
        .merge(bars)
        .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));

      // d3.select('p#value-new-york-times').text(
      //   d3.format('$,.2r')(dataNewYorkTimes[selected - 1].value)
      // );
    };

    draw(9);
  }
  render() {
    return (
      <SliderWrapper className="process" id="slider-new-york-times">
        
      </SliderWrapper>
    );
  }
}

export default Slider