/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-20 10:31:44
 * @LastEditors: konglingyuan
 * @LastEditTime : 2020-02-15 14:41:46
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
    SELECT_DATE
} from './constants';

import { combineData } from '../../utils/utils'

//开始加载数据
export const loadData = () => ({
    type: LOADING_DATA,
})

export const loadSuccess = (data) => ({
    type: LOAD_SUCCESS,
    citiesData: combineData(data[0]).data,
    dates: combineData(data[0]).dates.all,
    chinaTopoJson: data[1],
    selectedDate:  combineData(data[0]).dates.selected
})

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