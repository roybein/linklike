import React, {PropTypes} from 'react'

const Notifi = ({ text }) => (
  <div>
    {text}
  </div>
)

Notifi.propTypes = {
  text: PropTypes.string.isRequired
}

export default Notifi
