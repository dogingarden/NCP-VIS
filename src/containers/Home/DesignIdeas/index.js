/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-26 09:43:45
 */

import React from 'react'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'
import Wrapper from "./Wrapper";
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';



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
            title=""/>
           
          </figure>
          <div className="post-content">
            <h3>
              径向布局(Radial layout)
            </h3>
            <div className="post-desc">
            相对于地理的分布，更有利于对比城市间各种指标数据间的<b>差异程度</b>并体现<b>排序关系</b>。
            </div>
          </div>
        </div>
        <div className="post-container">
        <figure>
            <img width="410" 
            height="260" 
            src={image2}
            alt="" 
            title=""/>
           
          </figure>
          <div className="post-content">
            <h3>
              尺度缩放 (Scaling)
            </h3>
            <div className="post-desc">
            线性缩放保证精确的量化值，而对数缩放侧重考虑<b>长尾效应</b>，便于观察数值较小但数量众多的城市。
            </div>
          </div>
        </div>
        <div className="post-container">
          <figure>
            <img width="410" 
            height="260" 
            src={image3}
            alt="" 
            title=""/>
           
          </figure>
          <div className="post-content">
            <h3>
              时序变化 (Temporal dynamic)
            </h3>
            <div className="post-desc">
            各项指标随日期增长的动态过程，展现各城市疫情发展的<b>动态性</b>。
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
