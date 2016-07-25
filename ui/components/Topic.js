import React, {PropTypes} from 'react'

const Topic = ({ text }) => (
  <li>
    {text}
  </li>
)

Topic.propTypes = {
  text: PropTypes.string.isRequired
}

export default Topic
