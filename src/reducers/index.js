/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 21:21:35
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-13 23:15:07
 */
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import homeReducer from '../containers/Home/reducer'
import languageProviderReducer from '../containers/LanguageProvider/reducer'

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  router: connectRouter(history),
  home: homeReducer,
  language: languageProviderReducer
})

export default rootReducer
