/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-20 10:33:38
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-18 12:17:42
 */
import { fromJS } from 'immutable'

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
} from './constants'

//the initial state of Home
const initialState = fromJS({
  loading: false,
  failed: false,
  citiesData: [], //各个城市的疫情数据
  svgWidth: 800,
  svgHeight: 600,
  charges: [],
  chinaTopoJson: null,
  isFetching: true,
  bgType: "GEO",
  centerCity: "武汉市",
  dataType: "cum_dx",
  selectProvince: null,
  dates: null,
  selectedDate: null
})

const homeReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOADING_DATA:
      return state
        .set("loading", true);
    case LOAD_SUCCESS:
      return state
        .set("loading", false)
        .set("citiesData", action.citiesData)
        .set("chinaTopoJson", action.chinaTopoJson)
        .set("dates", action.dates)
        .set("selectedDate", action.selectedDate)
    case LOAD_FAILED:
      return state
        .set("loading", false)
        .set("failed", true)
    case SET_CITIES_DATA:
      return state
        .set("citiesData", action.citiesData)
    case RESIZE_SCREEN:
      return state
        .set("svgWidth", action.width)
        .set("svgHeight", action.height)      
    case CHANGE_BACKGROUND:
      return state
        .set("bgType", action.bgType)
    case CHANGE_DATA_TYPE:
      return state
        .set("dataType", action.dataType)
    case SELECT_CENTER:
      return state
        .set("centerCity", action.centerCity)
    case SELECT_PROVINCE:
      return state
        .set("selectProvince", action.selectProvince)
    case SELECT_DATE:
          return state
            .set("selectedDate", action.selectedDate)
    default:
      return state
  }
}

export default homeReducer
