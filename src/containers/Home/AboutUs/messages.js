/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 15:58:15
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-07 01:00:24
 */
/*
 * AboutUs Messages
 *
 * This contains all the text for the AboutUs container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AboutUs';

export default defineMessages({
  
  author1Name: {
    id: `${scope}.author1Name`,
    defaultMessage: '',
  },
  author2Name: {
    id: `${scope}.author2Name`,
    defaultMessage: '',
  },
  author3Name: {
    id: `${scope}.author3Name`,
    defaultMessage: '',
  },
});
