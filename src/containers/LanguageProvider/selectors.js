/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 22:54:11
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-13 23:16:51
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state['language'];

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.get('locale'));

export { selectLanguage, makeSelectLocale };
