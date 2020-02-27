/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-23 16:55:23
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Wrapper from "./Wrapper";
import image1 from './images/avator1.jpg';
import image2 from './images/avator2.jpg';

export default class AboutUs extends React.PureComponent {

  render() {
    return (
      <Wrapper >
        <div className="post-container">
          <figure>
            <img width="410"
              height="260"
              src={image1}
              alt=""
              title="" />

          </figure>
          <div className="post-content">
            <h3>
              <FormattedMessage {...messages.author1Name} />
            </h3>
            <div className="post-desc">
              系统设计、前端开发
              <br/>
              <a href="https://www.vis27.com/" target={'_blank'}>个人主页</a>
            </div>
          </div>
        </div>
        <div className="post-container">
          <figure>
            <img width="410"
              height="260"
              src={image2}
             alt=""
              title="" />

          </figure>
          <div className="post-content">
            <h3>
              <FormattedMessage {...messages.author2Name} />
            </h3>
            <div className="post-desc">
              系统设计、数据处理
              <br/>
              <a href="https://www.zhirenhuang.com/" target={'_blank'}>个人主页</a>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
