/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-16 22:09:44
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-16 22:09:44
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3';

const normalColor="#1856a3",centerColor="#fcd40d",provinceColor="#cce097";
const opacity=0.6;
const strokeOpacity=0.9;
const strokeColor="#222222"
class CircleVis extends Component{
    constructor(props) {
        super(props);
        this.barContainer=null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { bgType ,dataType,centerCity,selectedProvince,width,height,selectedDate} = this.props;
        
        //必须在背景类型或者数据类型更改的时候才会重绘。
        return  bgType !== nextProps.bgType||
                dataType!==nextProps.dataType||
                centerCity!==nextProps.centerCity||
                selectedProvince!==nextProps.selectedProvince||
                width!==nextProps.width||
                height!==nextProps.height||
                selectedDate!==nextProps.selectedDate
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
        let enter=circles.enter()
            .append('circle')
            .attr('r',  0)
            .on("click", d=>{handleChangeCernter(d.city)})
            .on("mouseover", (d, i) => {

                var labelbackground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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
               .attr('r',  d=> { return d.radius; })
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
            enter.attr('cx', d=> { return d.distance*Math.cos(d.rotate)+width/2;})
                .attr('cy', d=>{return d.distance*Math.sin(d.rotate)+height/2;})
            circles.merge(enter)
                .attr('class', 'item')
                
            .transition().duration(1000)
                .attr('r',  d=> { return d.radius; })
                .attr('cx', d=> { return d.distance*Math.cos(d.rotate)+width/2;})
                .attr('cy', d=>{return d.distance*Math.sin(d.rotate)+height/2;})
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
            .text(d=>{if(dataType==="POP"){
                    return "人口："+d3.format(",")(parseInt(centerCity.POP))+"万";
                }else if(dataType==="GDP"){
                    return "GDP："+d3.format(",")(parseInt(centerCity.GDP))+"亿";
                }else if(dataType==="GDP_POP"){
                    return "人均GDP："+d3.format(",")(parseInt(centerCity.GDP_POP))+"万";
                }
            });   
        barContainer.select("rect")
            .transition()
            .duration(500)
            .attr("width",d=>{ return barX(centerCity[dataType]); });

        circles
            .on("mouseover", function(d, i) {

                var labelbackground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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

                var labelforeground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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
            .text(d=>{if(dataType==="POP"){
                    return "人口："+d3.format(",")(parseInt(centerCity.POP))+"万";
                }else if(dataType==="GDP"){
                    return "GDP："+d3.format(",")(parseInt(centerCity.GDP))+"亿";
                }else if(dataType==="GDP_POP"){
                    return "人均GDP："+d3.format(",")(parseInt(centerCity.GDP_POP))+"万";
                }
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

            .on("mouseover", function(d, i) {

                var labelbackground = d3.select(this.parentNode)
                    .append('text')
                    .attr('class', 'label')
                    .style('text-anchor', 'middle')
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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
                    .text(()=>{if(dataType==="POP"){
                            return  d.city+"人口："+d3.format(",")(parseInt(d.POP))+"万";
                        }else if(dataType==="GDP"){
                            return d.city+"GDP："+d3.format(",")(parseInt(d.GDP))+"亿";
                        }else if(dataType==="GDP_POP"){
                            return d.city+"人均GDP："+d3.format(",")(parseInt(d.GDP_POP))+"万";
                        }
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
export default CircleVis