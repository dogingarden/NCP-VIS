/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-26 11:06:51
 */

import React from 'react'
// import { FormattedMessage } from 'react-intl'
// import messages from '../messages'
import './styles.css'
import Wrapper from "./Wrapper";
import App from './components/index'

export default class SecondPage extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { dates } = this.props
  //   return dates.selected !== nextProps.dates.selected
  // }
  getShowData(citiesData,selectedDate,dataType){
    let showData=[]
    //筛选日期
    citiesData.forEach(d => {
      if(d.date === selectedDate){
        showData = d.data
      }
    })
    // return showData
    //只返回大于零的item
    return showData.filter(d=>{
      return ~~d[dataType]>0
    })
  }
  
  render() {
    const { citiesData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType ,centerCity,dates, selectedDate,
      changeCenter,selectProvince, maxValue,
      selectedProvince,resizeScreen,selectDate,
      changeRadiusType,
      radiusType } = this.props

    let showData = this.getShowData(citiesData,selectedDate,dataType)

    return (
      <Wrapper >
        <App 
          { ...{citiesData: showData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType,centerCity,changeRadiusType,
            radiusType,
            selectedProvince,dates,selectedDate,maxValue} }
          { ...{changeCenter,selectProvince,resizeScreen,selectDate} }
        />
      </Wrapper>
    )
  }
}
