/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 23:19:49
 * @LastEditTime : 2020-02-14 22:39:42
 * @LastEditors: konglingyuan
 */
import { createSelector } from 'reselect'

const getData=(state)=>state['home']


const getLoading = createSelector(
    getData,
    (state)=>state.get('loading')
)

const getFailed = createSelector(
    getData,
    (state)=>state.get('failed')
)

const getCitiesData = createSelector(
    getData,
    (state)=>state.get('citiesData')
)
// svgWidth: 800,
//   svgHeight: 600,
//   charges: [],
//   chinaTopoJson: null,
//   isFetching: true,
//   bgType: "GEO",
//   centerCity: "北京市",
//   dataType: "GDP",
//   selectProvince: null
const getSvgWidth = createSelector(
    getData,
    (state)=>state.get('svgWidth')
)
const getSvgHeight = createSelector(
    getData,
    (state)=>state.get('svgHeight')
)
const getChinaTopoJson = createSelector(
    getData,
    (state)=>state.get('chinaTopoJson')
)
const getBgType = createSelector(
    getData,
    (state)=>state.get('bgType')
)
const getDataType = createSelector(
    getData,
    (state)=>state.get('dataType')
)
const getCenterCity = createSelector(
    getData,
    (state)=>state.get('centerCity')
)
const getSelectProvince = createSelector(
    getData,
    (state)=>state.get('selectProvince')
)
const getDates = createSelector(
    getData,
    (state)=>state.get('dates')
)
const getSelectedDate = createSelector(
    getData,
    (state)=>state.get('selectedDate')
)
export {
    getLoading,
    getFailed,
    getCitiesData,
    getSvgWidth,
    getSvgHeight,
    getChinaTopoJson,
    getBgType,
    getDataType,
    getSelectProvince,
    getCenterCity,
    getDates,
    getSelectedDate
}