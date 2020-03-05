/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-20 10:31:44
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-05 21:57:12
 */
import {
    LOADING_DATA,
    LOAD_SUCCESS,
    LOAD_FAILED,
    SET_CITIES_DATA,
    RESIZE_SCREEN,
    CHANGE_BACKGROUND,
    CHANGE_DATA_TYPE,
    SELECT_CENTER,
    SELECT_PROVINCE,
    SELECT_DATE,
    CHANGE_RADIUS_TYPE,
    CHANGE_DISTANCE_TYPE
} from './constants';

import { combineData } from '../../utils/utils'

//开始加载数据
export const loadData = () => ({
    type: LOADING_DATA,
})

export const loadSuccess = (data) => {
    const calcData = combineData(data[0])
    return (
        {
            type: LOAD_SUCCESS,
            citiesData: calcData.data,
            dates: calcData.dates.all,
            chinaTopoJson: data[1],
            selectedDate:  calcData.dates.selected,
            maxValue: calcData.maxValue,
        }
)}

export const loadFailed = () => ({
    type: LOAD_FAILED,
})
//为当前数据赋值
export const setCitiesData = (citiesData) => ({
    type: SET_CITIES_DATA,
    citiesData
})

export function resizeScreen(width, height) {
    return {
        type: RESIZE_SCREEN,
        width: width,
        height: height
    }
}
export function changeBackground(bgType) {
    return {
        type: CHANGE_BACKGROUND,
        bgType: bgType
    }
}
export function changeDataType(dataType) {
    return {
        type: CHANGE_DATA_TYPE,
        dataType: dataType
    }
}  
export function changeCenter(centerCity) {
   
    return {
        type: SELECT_CENTER,
        centerCity
    }
}
export function selectProvince(selectProvince) {
    return {
        type: SELECT_PROVINCE,
        selectProvince
    }
}
//修改选中日期
export function selectDate(selectedDate) {
    return {
        type: SELECT_DATE,
        selectedDate
    }
}
//修改球的半径计算方法
export function changeRadiusType(radiusType) {
    return {
        type: CHANGE_RADIUS_TYPE,
        radiusType
    }
}
//修改距离度量方法
export function changeDistanceType(distanceType) {
    return {
        type: CHANGE_DISTANCE_TYPE,
        distanceType
    }
}