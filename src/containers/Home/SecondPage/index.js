/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime : 2020-02-15 23:32:13
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import './styles.css'
import Wrapper from "./Wrapper";
import App from './components/index'

export default class SecondPage extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { dates } = this.props
  //   return dates.selected !== nextProps.dates.selected
  // }
  getShowData(citiesData,selectedDate){
    let showData=[]
    citiesData.forEach(d => {
      if(~~d.date === ~~selectedDate){
        showData = d.data
      }
    })
    return showData
  }
  
  render() {
    const { citiesData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType ,centerCity,dates, selectedDate,
      changeCenter,selectProvince,
      selectedProvince,resizeScreen,selectDate } = this.props

    let showData = this.getShowData(citiesData,selectedDate)

    return (
      <Wrapper >
        <App 
          { ...{citiesData: showData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType,centerCity,selectedProvince,dates,selectedDate} }
          { ...{changeCenter,selectProvince,resizeScreen,selectDate} }
        />
      </Wrapper>
    )
  }
}
