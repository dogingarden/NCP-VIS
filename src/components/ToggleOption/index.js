/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 21:51:30
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-21 00:24:21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Wrapper from './Wrapper';

const ToggleOption = ({ value, message, intl, onToggle }) => (
  // eslint-disable-next-line react/jsx-no-comment-textnodes
  <Wrapper value={value} onClick={() => onToggle(value)}>
    <a value={value} type="button">
      <span className={`flag flag-${value}`} />
      {message ? intl.formatMessage(message) : value}
    </a>
  </Wrapper>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  onToggle: PropTypes.func,
};

export default injectIntl(ToggleOption);
