
import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ N, fps }) => (
    <div style={{position: 'absolute', bottom: 0}} className="container">
        <strong>{N} particles</strong>
    </div>
);

Footer.propTypes = {
    N: PropTypes.number.isRequired
};

export default Footer;
