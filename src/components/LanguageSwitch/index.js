/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 21:51:30
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-15 18:18:28
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';

class LanguageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      active: !state.active,
    }));
  }

  render() {
    return (
      <Wrapper className="language">
        <div
          className="language-current"
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          role="presentation"
        >
          <span className={`flag flag-${this.props.locale}`} />
          <span className="language-name">
            <FormattedMessage {...this.props.messages[this.props.locale]} />
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="language-triangle"
        >
          <polygon points="0,0 8,0 4, 4" />
        </svg>
        <div className={this.state.active ? 'active languages' : 'languages'}>
          <LocaleToggle />
        </div>
      </Wrapper>
    );
  }
}
LanguageSwitch.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export default connect(mapStateToProps)(LanguageSwitch);
