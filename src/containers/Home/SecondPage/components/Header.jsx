
import React, {  Component } from 'react';
// import PropTypes from 'prop-types';

import SelectCity from "./SelectCity";
import SelectProvince from "./SelectProvince";
import SelectDate from "./SelectDate";
import FilterLink from '../containers/FilterLink';
import FilterType from '../containers/FilterType';
import FilterRadius from '../containers/FilterRadius';
import FilterDistance from '../containers/FilterDistance';

import HeaderWrapper from './HeaderWrapper'

class Header extends Component {
	render() {
		const { citiesData, changeCenter, selectProvince, selectedProvince, bgType,
			distanceType,
			  radiusType,
			dataType, dates, selectedDate, selectDate } = this.props
    	return (
		<HeaderWrapper className="container">
			
        	<div id="selectorcontainer">
				
	            <div id="select-data"></div>
		        <ul className="menus">
		          <li>
		            <span>疫情数据:</span>
		            {" "}
					<FilterType filter="city_confirmedCount" {...{dataType}}>
				      确诊
				    </FilterType>
				    {"/ "}
					<FilterType filter="city_curedCount" {...{dataType}}>
				      治愈
				    </FilterType>
					{"/ "}
					<FilterType filter="city_deadCount" {...{dataType}}>
				      死亡
				    </FilterType>
					{"/ "}
					<FilterType filter="day_inc" {...{dataType}}>
				      新增确诊
				    </FilterType>
		          </li>
				  <li>
		            <span>城市信息:</span>
		            {" "}
				    <FilterType filter="POP" {...{dataType}}>
				      人口
				    </FilterType>
				    {"/ "}
				    <FilterType filter="GDP" {...{dataType}}>
				      GDP
				    </FilterType>
					{"/ "}
				    <FilterType filter="hospital" {...{dataType}}>
				      医院
				    </FilterType>
					{"/ "}
				    <FilterType filter="bed" {...{dataType}}>
				      病床
				    </FilterType>
					{"/ "}
				    <FilterType filter="doctor" {...{dataType}}>
				      医生
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
				  <li>
		            <span>面积比例:</span>
		            {" "}
				    <FilterRadius filter="scaleLinear" {...{radiusType}}>
				      线性
				    </FilterRadius>
				    {"/"}
				    <FilterRadius filter="scaleLog" {...{radiusType}}>
					  对数
				    </FilterRadius> 
				  </li>
				  {bgType==="RADIAL" &&
					<li>
						<span>距离度量:</span>
						{" "}
						<FilterDistance filter="scaleLinear" {...{distanceType}}>
						线性
						</FilterDistance>
						{"/"}
						<FilterDistance filter="scaleLog" {...{distanceType}}>
						对数
						</FilterDistance> 
					</li>
					}
		        </ul>
		        {/* <span id="about"><a href="http://vis27.com">彩色说</a>制作发布</span> */}
				<div className="select-group">
					<SelectDate {...{dates,selectDate,selectedDate}}/>
					<SelectCity 
						citiesData={this.props.citiesData} 
						centerCity={this.props.centerCity}
						{...{changeCenter}}/>
					<SelectProvince {...{citiesData,selectProvince,selectedProvince}}/>
					
				
				</div>
				
		    </div>
		</HeaderWrapper>	
	)}
}

export default Header;
