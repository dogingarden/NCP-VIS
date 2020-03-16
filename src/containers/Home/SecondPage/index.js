/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-16 10:37:14
 */

import React from 'react'

import './styles.css'
import Wrapper from "./Wrapper";
import App from './components/index'

export default class SecondPage extends React.Component {

  getShowData(citiesData,selectedDate,dataType){
    let showData=[]
    //筛选日期
    citiesData.forEach(d => {
      if(d.date === selectedDate){
        showData = d.data
      }
    })
    return showData
    //只返回大于零的item
    // return showData.filter(d=>{
    //   // return ~~d[dataType]>0
    // })
  }
  
  render() {
    const { citiesData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType ,centerCity,dates, selectedDate,
      changeCenter,selectProvince, maxValue,
      selectedProvince,resizeScreen,selectDate,
      radiusType,
      distanceType,
    } = this.props

    let showData = this.getShowData(citiesData,selectedDate,dataType)

    return (
      <Wrapper >
        <App 
          { ...{allData: citiesData, citiesData: showData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType,centerCity,
            radiusType,
            distanceType,
            selectedProvince,dates,selectedDate,maxValue} }
          { ...{changeCenter,selectProvince,resizeScreen,selectDate} }
        />
      </Wrapper>
    )
  }
}
