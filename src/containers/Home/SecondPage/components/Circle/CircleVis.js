/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-16 22:09:44
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-16 13:44:53
 */
import messages from '../../messages'
import { injectIntl } from 'react-intl';

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3';

//1856a3
const normalColor="#6C3F60",centerColor="#fcd40d",provinceColor="#cce097";
const opacity=0.7//0.6;
const strokeOpacity=0.9;
const strokeColor="#222222"//"#222222"
class CircleVis extends Component{
    constructor(props) {
        super(props);
        const { intl } = this.props

        this.formatMessage = intl.formatMessage

        this.barContainer=null
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { bgType ,dataType,centerCity,selectedProvince,width,height,selectedDate,radiusType,distanceType} = this.props;
        
        //必须在背景类型或者数据类型更改的时候才会重绘。
        return  bgType !== nextProps.bgType||
                dataType!==nextProps.dataType||
                centerCity!==nextProps.centerCity||
                selectedProvince!==nextProps.selectedProvince||
                width!==nextProps.width||
                height!==nextProps.height||
                selectedDate!==nextProps.selectedDate||
                radiusType!==nextProps.radiusType||
                distanceType!==nextProps.distanceType
    }
    updateCircles(prevProps, prevState){
        const { projection, bgType, centerCity, height, width, selectedProvince, dataType ,handleChangeCernter} = this.props;

        this.container = d3.select(ReactDOM.findDOMNode(this.refs.container));
        let circles=this.container.selectAll("circle")
              .data(this.props.data, function(d) { return d.city; });
        //选择城市#fcd40d 选择省cce097 一般 2095d2
        if(selectedProvince!==prevProps.selectedProvince){
            circles.transition().duration(1000)
                .style("fill",d=>{
                    let color =normalColor;
                    if(d.province === selectedProvince){
                        color = provinceColor;
                    }
                    if(d.city === centerCity.city){
                        color = centerColor;
                    }
                    return color;
                });
            return ;
        }
        var barX = d3.scaleLinear()
            .range([0, 120])
            .domain([0, d3.max(this.props.data, d=>{
                return ~~d[dataType]
                })]
            );
        // if(centerCity!==prevProps.centerCity){
        //     circles
        //         .transition().duration(1000).delay(function(d) { return d * 40; })
                
        // }
        let enter = circles.enter()
            .append('circle')
            .attr('r',  0)
            .on("click", d=>{handleChangeCernter(d.city)})
            .on("mouseover", (d, i) => {

                var labelbackground = this.container
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .style('stroke', 'rgb(240,249,255)')
                    .style('stroke-width', 3.5)
                    .style('stroke-opacity', 0.6)
                    .style('filter', 'url:(#dropshadow)')
                    .attr('dy', function() { return -d.radius; })
                    .style('fill', 'none')

                var labelforeground = this.container
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    // .text(function() { return d.city; })
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .attr('dy', function() { return -d.radius; })
                    .style('fill', '#000')

                if (bgType === "GEO") {
                    labelbackground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })

                    labelforeground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })
                } else {
                    labelbackground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })

                    labelforeground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })
                }
                this.barContainer.append("rect")
                    .attr("id","reactMarker")
                    .attr("height",10)
                    .attr("width",3)
                    .attr("transform",()=>{ return "translate(" + (barX(d[dataType]))+",20)"; })
                    // .attr("transform","translate(50,10)")
                    .attr("fill",normalColor);
            })
            .on("mouseout", (d, i)=> {
                d3.selectAll('.label')
                    .remove();

                this.barContainer.select("#reactMarker")
                    .remove();
            });
        circles.exit()
            .transition().duration(1000)
            .attr('r',  0)
            .style("stroke-opacity",0)
            .style("opacity", 0)
            .remove()
        if(bgType==="GEO"){        
               
            enter.attr('cx', function(d) { return projection([d.lon,d.lat])[0]; })
               .attr('cy', function(d) { return projection([d.lon,d.lat])[1]; })
            circles.merge(enter)
              .attr('class', 'item')
            .transition().duration(1000)
                .attr('cx', function(d) { return projection([d.lon,d.lat])[0]; })
               .attr('cy', function(d) { return projection([d.lon,d.lat])[1]; })
               .attr('r',  d=> {  
                return d.radius; })
               .style("fill",d=>{
                    let color =normalColor;
                    if(d.province===selectedProvince){
                        color = provinceColor;
                    }
                    if(d.city===centerCity.city){
                        color = centerColor;
                    }
                    return color;

                })
                .style('stroke', strokeColor)
                .style("stroke-opacity",strokeOpacity)
                .style("opacity", opacity)
                
               
        }
        else if(bgType==="RADIAL"){
            enter.attr('cx', d=> {return width/2;})
                .attr('cy', d=>{return height/2;})
            circles.merge(enter)
                .attr('class', 'item')
            .transition().duration(1000)
                .attr('r',  d=> { return d.radius; })
                // .attr('cx', d=> {return width/2;})
                // .attr('cy', d=>{return height/2;})
                .attr('cx', d=> { 
                    if(d.radius===0){
                        return width / 2;
                    }else{
                        return d.distance*Math.cos(d.rotate)+width/2;
                    }
                     
                })
                .attr('cy', d=>{ 
                    if(d.radius===0){
                        return height/2;
                    }else{
                        return d.distance*Math.sin(d.rotate)+height/2;
                    }
                })
                .style("fill",d=>{
                    let color =normalColor;
                    if(d.province===selectedProvince){
                        color = provinceColor;
                    }
                    if(d.city===centerCity.city){
                        color = centerColor;
                    }
                    return color;
                })
                .style('stroke', strokeColor)
                .style("stroke-opacity",strokeOpacity)
                .style("opacity", opacity)
                
        }
       
        // let barX = d3.scaleLinear()
        //     .range([0, 120])
        //     .domain([0, d3.max(this.props.data, d=>{
        //         return ~~d[dataType]
        //         })]
        //     );

        let barContainer=d3.select("#select-data").select("svg");

        barContainer.select("text")
            .text(d=>{
                return this.getBarText(dataType,centerCity)
            });   
        barContainer.select("rect")
            .transition()
            .duration(500)
            .attr("width",d=>{ return barX(centerCity[dataType]); });

        circles
            .on("mouseover", (d, i) => {
                var labelbackground = this.container
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .style('stroke', 'rgb(240,249,255)')
                    .style('stroke-width', 3.5)
                    .style('stroke-opacity', 0.6)
                    .style('filter', 'url:(#dropshadow)')
                    .attr('dy', function() { return -d.radius-5; })
                    .style('fill', 'none')

                var labelforeground = this.container
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .attr('dy', function() { return -d.radius-5; })
                    .style('fill', '#000')

                if (bgType === "GEO") {
                    labelbackground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })

                    labelforeground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })
                } else {
                    labelbackground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })

                    labelforeground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })
                }

                barContainer.append("rect")
                    .attr("id","reactMarker")
                    .attr("height",10)
                    .attr("width",3)
                    .attr("transform",()=>{ return "translate(" + (barX(d[dataType]))+",20)"; })
                    // .attr("transform","translate(50,10)")
                    .attr("fill",normalColor);
            })
            .on("mouseout", function(d, i) {
                d3.selectAll('.label')
                    .remove()

                barContainer.select("#reactMarker")
                    .remove();
            });
        

    }
    getBarText(dataType,centerCity){

        let title=''
        // eslint-disable-next-line default-case
        switch (dataType) {
            case "POP":
                title = this.formatMessage(messages.population) + "：" + 
                    d3.format(",")(parseInt(centerCity.POP)) + this.formatMessage(messages.unitWan) ;
                break;
            case "GDP":
                title = this.formatMessage(messages.GDP) + "：" +
                    d3.format(",")(parseInt(centerCity.GDP)) + this.formatMessage(messages.unitYi) ;
                break;
            case "city_confirmedCount":
                title = this.formatMessage(messages.confirmed) + "：" + 
                    d3.format(",")(parseInt(centerCity.city_confirmedCount)) + this.formatMessage(messages.unitRen) ;
                break;
            case "city_curedCount":
                title = this.formatMessage(messages.cured) + "：" + 
                    d3.format(",")(parseInt(centerCity.city_curedCount)) + this.formatMessage(messages.unitRen) ;
                break;
            case "city_deadCount":
                title =  this.formatMessage(messages.dead) + "："+
                    d3.format(",")(parseInt(centerCity.city_deadCount)) + this.formatMessage(messages.unitRen) ;
                break;
            case "hospital":
                title =  this.formatMessage(messages.hospital) + "：" + 
                    d3.format(",")(parseInt(centerCity.hospital)) + this.formatMessage(messages.unitGe) ;
                break;
            case "bed":
                title = this.formatMessage(messages.bed) + "：" + 
                    d3.format(",")(parseInt(centerCity.bed)) + this.formatMessage(messages.unitZhang) ;
                break;
            case "doctor":
                title = this.formatMessage(messages.doctor) + "：" + 
                    d3.format(",")(parseInt(centerCity.doctor)) + this.formatMessage(messages.unitWei) ;
                break;
            case "day_inc":
                title = this.formatMessage(messages.newlyConfirmed) + "：" + 
                    d3.format(",")(parseInt(centerCity.day_inc)) + this.formatMessage(messages.unitRen) ;
                break;
            case "day_now_confirm":
                title =  this.formatMessage(messages.exitingConfirmed) + "：" + 
                    d3.format(",")(parseInt(centerCity.day_now_confirm)) + this.formatMessage(messages.unitRen) ;
                break;
        } 
        if(centerCity.city===undefined){
            title=''
        }
        return title
    }
    getMouseOverText(d,dataType){
        
        let title=''
        // eslint-disable-next-line default-case
        switch (dataType) {
            case "POP":
                title = d.city + this.formatMessage(messages.population) + "：" + 
                    d3.format(",")(parseInt(d.POP)) + this.formatMessage(messages.unitWan) ;
                break;
            case "GDP":
                title = d.city + this.formatMessage(messages.GDP) + "：" + 
                    d3.format(",")(parseInt(d.GDP)) +this.formatMessage(messages.unitYi);
                 break;
            case "city_confirmedCount":
                console.log(this.formatMessage(messages.unitRen))
                title = d.city + this.formatMessage(messages.confirmed) + "：" + 
                    d3.format(",")(parseInt(d.city_confirmedCount))+this.formatMessage(messages.unitRen);
                 break;
            case "city_curedCount":
                title = d.city+this.formatMessage(messages.cured)+"："+
                    d3.format(",")(parseInt(d.city_curedCount))+this.formatMessage(messages.unitRen);
                 break;
            case "city_deadCount":
                title = d.city+this.formatMessage(messages.dead)+"："+
                    d3.format(",")(parseInt(d.city_deadCount))+this.formatMessage(messages.unitRen);
                 break;
            case "hospital":
                title = d.city+this.formatMessage(messages.hospital)+"："+
                    d3.format(",")(parseInt(d.hospital))+this.formatMessage(messages.unitGe);
                 break;
            case "bed":
                title = d.city + this.formatMessage(messages.bed) + "："+
                    d3.format(",")(parseInt(d.bed)) + this.formatMessage(messages.unitZhang);
                break;
            case "doctor":
                title = d.city+this.formatMessage(messages.doctor)+"："+
                d3.format(",")(parseInt(d.doctor)) + this.formatMessage(messages.unitWei);
                break;
            case "day_inc":
                title = d.city+this.formatMessage(messages.newlyConfirmed)+"："+
                d3.format(",")(parseInt(d.day_inc)) + this.formatMessage(messages.unitRen);
                break;
            case "day_now_confirm":
                title = d.city+this.formatMessage(messages.exitingConfirmed)+"："+
                d3.format(",")(parseInt(d.day_now_confirm)) + this.formatMessage(messages.unitRen);
                break;
        } 
        return title
    }
    componentDidMount(){

        const {projection, bgType, centerCity, width, height,dataType, handleChangeCernter} = this.props;
        this.container = d3.select(ReactDOM.findDOMNode(this.refs.container));
        var circles=this.container.selectAll("circle")
          .data(this.props.data, function(d) { return d.city; });
        var barX = d3.scaleLinear()
            .range([0, 120])
            .domain([0, d3.max(this.props.data, d=>{
                return ~~d[dataType]
                })]
            );
        //设置显示bar


        this.barContainer=d3.select("#select-data")
            .append("svg")
            .attr("width",130)
            .attr("height",50);

        this.barContainer.append("text")
            .attr("transform","translate(0,12)")
            .text(d=>{
                return this.getBarText(dataType,centerCity)
            })
            .attr("text-anchor","start")
            .attr("alignment-baseline","middle");
            ;   
        this.barContainer.append("rect")
            .attr("height",10)
            .attr("width",d=>{ return barX(centerCity[dataType]); })
            .attr("transform","translate(0,20)")
            .attr("fill",centerColor);

        circles.enter().append('circle')
            .attr('class', 'item')
            .attr('r', function(d) { return d.radius; })
            .attr('cx', function(d) { return projection([d.lon,d.lat])[0]; })
            .attr('cy', function(d) { return projection([d.lon,d.lat])[1]; })
            .attr("transform",function(d){return "translate(0,0)"})
            .style('stroke', strokeColor)
            .style("fill",d=>{
                if(d.city===centerCity.city){
                    return centerColor;
                }else{ return normalColor;}
            
            })
            .style("stroke-opacity",strokeOpacity)
            .style("opacity", opacity)
            .on("click",d=>{handleChangeCernter(d.city)})

            .on("mouseover", (d, i) => {

                var labelbackground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .style('stroke', 'rgb(240,249,255)')
                    .style('stroke-width', 3.5)
                    .style('stroke-opacity', 0.6)
                    .style('filter', 'url:(#dropshadow)')
                    .attr('dy', function() { return -d.radius; })
                    .style('fill', 'none')

                var labelforeground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    // .text(function() { return d.city; })
                    .text(()=>{
                        return this.getMouseOverText(d,dataType)
                    })
                    .style('font-family', "'Quicksand', sans-serif")
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .attr('dy', function() { return -d.radius; })
                    .style('fill', '#000')

                if (bgType === "GEO") {
                    labelbackground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })

                    labelforeground
                        .attr('y', function() { return projection([d.lon, d.lat])[1]; })
                        .attr('x', function() { return projection([d.lon, d.lat])[0]; })
                } else {
                    labelbackground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })

                    labelforeground
                        .attr('x', function() { return d.distance*Math.cos(d.rotate)+width/2; })
                        .attr('y', function() { return d.distance*Math.sin(d.rotate)+height/2; })
                }
                this.barContainer.append("rect")
                    .attr("id","reactMarker")
                    .attr("height",10)
                    .attr("width",3)
                    .attr("transform",()=>{ return "translate(" + (barX(d[dataType]))+",20)"; })
                    // .attr("transform","translate(50,10)")
                    .attr("fill",normalColor);
            })
            .on("mouseout", function(d, i) {
                d3.selectAll('.label')
                    .remove();

                this.barContainer.select("#reactMarker")
                    .remove();
            });

        
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateCircles(prevProps, prevState)
    }
    render() {
        return (
        <svg width={this.props.width}
                   height={this.props.height}
                   ref="container">
        </svg>
        );
    }
}
export default injectIntl(CircleVis)