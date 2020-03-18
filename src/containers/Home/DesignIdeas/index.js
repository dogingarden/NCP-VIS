/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:36:09
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-18 08:46:53
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
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
              <FormattedMessage {...messages.idea1title} />
            </h3>
            <div className="post-desc">
              <FormattedMessage {...messages.idea1desc1} />
              <b><FormattedMessage {...messages.idea1desc2} /></b>
              <FormattedMessage {...messages.idea1desc3} />
              <b><FormattedMessage {...messages.idea1desc4} /></b>
              <FormattedMessage {...messages.idea1desc5} />
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
              <FormattedMessage {...messages.idea2title} />
            </h3>
            <div className="post-desc">
              <FormattedMessage {...messages.idea2desc1} />
              <b><FormattedMessage {...messages.idea2desc2} /></b>
              <FormattedMessage {...messages.idea2desc3} />
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
              <FormattedMessage {...messages.idea3title} />
            </h3>
            <div className="post-desc">
              <FormattedMessage {...messages.idea3desc1} />
              <b><FormattedMessage {...messages.idea3desc2} /></b>
              <FormattedMessage {...messages.idea3desc3} />
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
