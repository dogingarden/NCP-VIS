/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-21 15:19:41
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-23 12:37:59
 */
import { call, put, takeLatest } from 'redux-saga/effects'
import { LOADING_DATA } from './constants'
import { loadSuccess, loadFailed } from './actions'
import * as d3 from 'd3'


function d3LoadData(){
   return Promise.all([
      d3.csv('./data/cumulative_diagnosis_0124_0317.csv'),
      d3.json('./data/china.topojson'),
   ])
}
// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchData(action) {
   try {
      const data = yield call(d3LoadData)
      yield put(loadSuccess(data))
   } catch (e) {
      yield put(loadFailed())
   }
}

/*
  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
function* loadData() {
  yield takeLatest(LOADING_DATA, fetchData)
}

export default loadData