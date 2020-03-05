/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 23:19:49
 * @LastEditTime: 2020-03-05 21:55:18
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
const getMaxValue = createSelector(
    getData,
    (state)=>state.get('maxValue')
)
const getRadiusType = createSelector(
    getData,
    (state)=>state.get('radiusType')
)
const getDistanceType = createSelector(
    getData,
    (state)=>state.get('distanceType')
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
    getSelectedDate,
    getMaxValue,
    getRadiusType,
    getDistanceType
}