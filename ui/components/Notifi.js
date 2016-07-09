import React, {PropTypes} from 'react'

const Notifi = ({ text }) => (
  <li>
    {text}
  </li>
)

Notifi.propTypes = {
  text: PropTypes.string.isRequired
}

export default Notifi
