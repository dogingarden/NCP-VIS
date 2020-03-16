
import React, {  Component } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
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
			  centerCity,
			dataType, dates, selectedDate, selectDate } = this.props
    	return (
		<HeaderWrapper className="container">
			
        	<div id="selectorcontainer">
				
	            <div id="select-data"></div>
		        <ul className="menus">
		          <li>
		            <span className="header"> 
						<FormattedMessage {...messages.PlagueData}/>:
					</span>
		            {" "}
					<FilterType filter="city_confirmedCount" {...{dataType}}>
						<FormattedMessage {...messages.confirmed}/>
				    </FilterType>
				    {"/ "}
					<FilterType filter="city_curedCount" {...{dataType}}>
						<FormattedMessage {...messages.cured}/>
				    </FilterType>
					{"/ "}
					<FilterType filter="city_deadCount" {...{dataType}}>
				    	<FormattedMessage {...messages.dead}/>
				    </FilterType>
					{"/ "}
					<FilterType filter="day_inc" {...{dataType}}>
						<FormattedMessage {...messages.newlyConfirmed}/>
				    </FilterType>
					{"/ "}
					<FilterType filter="day_now_confirm" {...{dataType}}>
						<FormattedMessage {...messages.exitingConfirmed}/>
				    </FilterType>
		          </li>
				  <li>
		            <span className="header">
						<FormattedMessage {...messages.cityInfo}/>
					:</span>
		            {" "}
				    <FilterType filter="POP" {...{dataType}}>
						<FormattedMessage {...messages.population}/>
				    </FilterType>
				    {"/ "}
				    <FilterType filter="GDP" {...{dataType}}>
						<FormattedMessage {...messages.GDP}/>
				    </FilterType>
					{"/ "}
				    <FilterType filter="hospital" {...{dataType}}>
						<FormattedMessage {...messages.hospital}/>
				    </FilterType>
					{"/ "}
				    <FilterType filter="bed" {...{dataType}}>
						<FormattedMessage {...messages.bed}/>
				    </FilterType>
					{"/ "}
				    <FilterType filter="doctor" {...{dataType}}>
				    	<FormattedMessage {...messages.doctor}/>
				    </FilterType>
		          </li>
		          <li>
		            <span className="header">
						<FormattedMessage {...messages.layoutType}/>:
					</span>
		            {" "}
				    <FilterLink filter="RADIAL" {...{bgType}}>
						<FormattedMessage {...messages.radial}/>
				    </FilterLink>
				    {"/"}
				    <FilterLink filter="GEO" {...{bgType}}>
						<FormattedMessage {...messages.geo}/>
				    </FilterLink> 
				  </li>
				  <li>
		            <span className="header">
						<FormattedMessage {...messages.areaRatio}/>
					:</span>
		            {" "}
				    <FilterRadius filter="scaleLinear" {...{radiusType}}>
						<FormattedMessage {...messages.linear}/>
				    </FilterRadius>
				    {"/"}
				    <FilterRadius filter="scaleLog" {...{radiusType}}>
						<FormattedMessage {...messages.log}/>
				    </FilterRadius> 
				  </li>
				  {bgType==="RADIAL" &&
					<li>
						<span className="header">
							<FormattedMessage {...messages.distance}/>	
						:</span>
						{" "}
						<FilterDistance filter="scaleLinear" {...{distanceType}}>
							<FormattedMessage {...messages.linear}/>
						</FilterDistance>
						{"/"}
						<FilterDistance filter="scaleLog" {...{distanceType}}>
							<FormattedMessage {...messages.log}/>
						</FilterDistance> 
					</li>
					}
		        </ul>
				<div className="select-group">
					<SelectDate {...{dates,selectDate,selectedDate}}/>
					<SelectCity 
						{...{changeCenter, centerCity, citiesData}}/>
					<SelectProvince {...{citiesData,selectProvince,selectedProvince}}/>
				</div>
				
		    </div>
		</HeaderWrapper>	
	)}
}

export default Header;
