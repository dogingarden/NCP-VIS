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
import Wrapper from "./Wrapper";

export default class AboutUs extends React.PureComponent {

  render() {
    return (
      <Wrapper >
        <h1>孔令远</h1>
        <h1>黄智仁</h1>
      </Wrapper>
    )
  }
}
