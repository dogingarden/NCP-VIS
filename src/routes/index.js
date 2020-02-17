/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 21:21:35
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-13 23:18:22
 */
import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../containers/Home/index'
import Hello from '../containers/Counter/Hello'
import Counter from '../containers/Counter/Counter'
import NoMatch from '../containers/NoMatch'
// import NavBar from '../components/NavBar'
import LanguageSwitch from 'components/LanguageSwitch';
import messages from './messages';
import GlobalStyle from '../global-styles';
const routes = (
  <div>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
      <Route path="/counter" component={Counter} />
      <Route component={NoMatch} />
    </Switch>
    <LanguageSwitch {...{ messages }} />
    <GlobalStyle />
  </div>
)

export default routes
