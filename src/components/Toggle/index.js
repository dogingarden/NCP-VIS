/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Ul from './Ul';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <li />;

  // If we have items, render them
  if (props.values) {
    content = props.values
      .filter(d => d !== props.value)
      .map(value => (
        <ToggleOption
          key={value}
          value={value}
          message={props.messages[value]}
          onToggle={props.onToggle}
        />
      ));
  }

  return <Ul value={props.value}>{content}</Ul>;
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
