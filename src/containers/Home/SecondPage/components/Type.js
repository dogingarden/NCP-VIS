/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-14 19:46:12
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-21 00:26:07
 */
import React from 'react'
import PropTypes from 'prop-types'

const Type = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" onClick={e => { // eslint-disable-line jsx-a11y/href-no-hash
      e.preventDefault()
      onClick()
    }}>
      {children}
    </a>
  )
}

Type.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Type
