/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 15:58:15
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-13 16:23:45
 */
/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  firstSlide: {
    id: `${scope}.firstSlide`,
    defaultMessage: '第一',
  },
  secondSlide: {
    id: `${scope}.secondSlide`,
    defaultMessage: '第二',
  },
  thirdSlide: {
    id: `${scope}.thirdSlide`,
    defaultMessage: '第三',
  },
  fourthSlide: {
    id: `${scope}.fourthSlide`,
    defaultMessage: '第四',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: '',
  },
  desc: {
    id: `${scope}.desc`,
    defaultMessage: '',
  },
});
