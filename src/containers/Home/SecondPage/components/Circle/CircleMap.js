import React, { Component } from 'react';
import * as d3 from 'd3';
import CircleVis from './CircleVis'


class CircleMap extends Component {

    constructor(props) {
        super(props);
        
        //
        this.updateD3(props);
    }

    // update D3 objects when props update
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
    getDisance(lat1, lng1, lat2, lng2) { //lat为纬度, lng为经度, 一定不要弄错
        let dis = 0;
        let radLat1 = this.toRad(lat1);
        let radLat2 = this.toRad(lat2);
        let deltaLat = radLat1 - radLat2;
        let deltaLng = this.toRad(lng1) - this.toRad(lng2);
        dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return dis * 6378137;
    }
    toRad(d) {  return d * Math.PI / 180; }
    // Re-center the geo projection
    // Update domain of quantize scale
    updateD3(props) {
        const {chinaTopoJson,width,height,handleChangeCernter}=props
        this.projection = d3.geoMercator()
            .scale(1)
            .translate([0, 0]);

        this.areas = chinaTopoJson.features;
        this.border = chinaTopoJson.features;
        this.path = d3.geoPath().projection(this.projection);

        //确定边界，左上与右下 坐标
        let b = this.path.bounds(chinaTopoJson);

        //选出高和宽之中占比大的那个。
        this.s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        this.t = [(width - this.s * (b[1][0] + b[0][0])) / 2, (height - this.s * (b[1][1] + b[0][1])) / 2*1.1];

        this.projection = d3.geoMercator()
            .scale(this.s)
            .translate(this.t);
        this.geoPath = d3.geoPath()
            .projection(this.projection);
        /////////
        let data=props.citiesData;
        this.centerCity={};

        data.forEach(d=>{
            if(d.city===props.centerCity){
                this.centerCity=d;
            }
        });
        // console.log(props.centerCity)
        // //如果没有该中心节点，就重置中心节点
        // if(this.centerCity==={}){
        //     handleChangeCernter("北京")
        //     
        //     return;
        // }
        data.sort((city1,city2)=>{
            return this.getDisance(city1.lat,city1.lon,this.centerCity.lat,this.centerCity.lon)-this.getDisance(city2.lat,city2.lon,this.centerCity.lat,this.centerCity.lon);

        });
        //计算每个点与选中点的距离
        let distance = data.map((city)=>{

            return Math.abs(city[props.dataType]-this.centerCity[props.dataType]);
        });
        let max=d3.min([props.width / 2 - 90, props.height / 2 - 90])
        if(d3.min([props.width, props.height ])<900){
            max=d3.min([props.width / 2 - 20, props.height / 2 - 20])
        }
        const scale = d3.scaleLinear()
            .domain([0, d3.max(distance, function(d){
                return ~~d;
            })])
            .range([0, max]);
        data.forEach((d,i)=>{
            d.distance=scale(distance[i]);
            d.rotate=i/data.length*Math.PI*2;
        });
        //计算出每个圆形相应的面积
    }

    
    calculateCircleRadius(data,attr){
        var scale = d3.scaleLinear()
            .domain([0, Math.sqrt(d3.max(data, function(d){
                return ~~d[attr];
            }))])
            .range([0, 20]);
        //计算出每个圆形相应的面积
        data = data.map(d=>{
            d.radius=scale(Math.sqrt(d[attr]));
            return d;
        });
        return data;
    }

    // If no data, do nothing (we might mount before data loads into props)
    render() {
        const {width, height, bgType, dataType,selectedProvince, handleChangeCernter, selectedDate}=this.props

        const { projection, centerCity }=this
        if (!this.props.citiesData) {
            return null;
        }else{
            let transform="";
            if(this.props.bgType==="GEO"){
                transform="translate(0,0)";

            }else if(this.props.bgType==="RADIAL"){
                transform="translate("+this.props.width/2+","+this.props.height/2+")";
            }
            // Loop through counties and draw <County> components
            // Add a single <path> for state borders
            return (
                <g  ref='circleContainer'>
                    <CircleVis 
                        data={this.calculateCircleRadius(this.props.citiesData,this.props.dataType)}
                        {...{width, height, bgType, dataType, projection, centerCity, selectedDate, selectedProvince, handleChangeCernter}}

                    />
                </g>
            );
        }
    }
}

export default CircleMap;