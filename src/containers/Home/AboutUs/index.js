/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-14 22:05:11
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Wrapper from "./Wrapper";
import image1 from './images/avator1.jpg';
import image2 from './images/avator2.jpg';
import image3 from './images/avator3.jpg';

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
              <FormattedMessage {...messages.author1Task} />
              <br/>
              <a href="https://www.vis27.com/" target={'_blank'}>
                <FormattedMessage {...messages.homepage} />
              </a>
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
              <FormattedMessage {...messages.author2Task} />
              <br/>
              <a href="https://www.zhirenhuang.com/" target={'_blank'}>
                <FormattedMessage {...messages.homepage} />
              </a>
            </div>
          </div>
          
        </div>
        <div className="post-container">
          <figure>
            <img width="410"
              height="260"
              src={image3}
              alt=""
              title="" />

          </figure>
          <div className="post-content">
            <h3>
              <FormattedMessage {...messages.author3Name} />
            </h3>
            <div className="post-desc">
              <FormattedMessage {...messages.author3Task} />
              <br/>
              <a href="http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzIxNzM0MTczOA==#wechat_webview_type=1&wechat_redirect" target={'_blank'}>
                <FormattedMessage {...messages.homepage} />
              </a>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
