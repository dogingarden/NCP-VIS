
import React, {  Component } from 'react';
// import PropTypes from 'prop-types';

import SelectCity from "./SelectCity";
import SelectProvince from "./SelectProvince";
import SelectDate from "./SelectDate";
import FilterLink from '../containers/FilterLink';
import FilterType from '../containers/FilterType';
import HeaderWrapper from './HeaderWrapper'

class Header extends Component {
	render() {
		const { changeCenter,selectProvince,citiesData,selectedProvince,bgType,dataType,dates,selectedDate,selectDate } = this.props
    	return (
		<HeaderWrapper className="container">
        	{/* <h1>你的家乡有多特别</h1> */}
	        {/* <h2>看一下哪些城市更像你家乡</h2>
	        <h4>基于2017年各省统计局发布的官方权威数据绘制而成，从人口、GDP、人均GDP等方面权威解读各城市的差异性与相似性，快来看看你感兴趣的城市吧！</h4> */}
	        <div id="selectorcontainer">
				<SelectCity 
					citiesData={this.props.citiesData} 
	                centerCity={this.props.centerCity}
					{...{changeCenter}}/>
	            <div id="select-data"></div>
		        <ul className="menus">
		          <li>
		            <span>圆形面积:</span>
		            {" "}
				    <FilterType filter="POP" {...{dataType}}>
				      人口
				    </FilterType>
				    {"/ "}
				    <FilterType filter="GDP" {...{dataType}}>
				      GDP
				    </FilterType>
		          </li>
		          <li>
		            <span>布局方式:</span>
		            {" "}
				     <FilterLink filter="RADIAL" {...{bgType}}>
				      径向布局
				    </FilterLink>
				    {"/"}
				    <FilterLink filter="GEO" {...{bgType}}>
				      地理布局
				    </FilterLink> 
				  </li>
		        </ul>
		        {/* <span id="about"><a href="http://vis27.com">彩色说</a>制作发布</span> */}
		        <SelectProvince {...{citiesData,selectProvince,selectedProvince}}/>
				<SelectDate {...{dates,selectDate,selectedDate}}/>
		    </div>
		</HeaderWrapper>	
	)}
}

export default Header;
