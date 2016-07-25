import React, {PropTypes} from 'react'

import Topic from './../components/Topic'

const TopicList = ({ topics }) => (
  <ul>
    {topics.map(topic =>
      <Topic
        key={topic.id}
        text={topic.topic}
      />
    )}
  </ul>
)

TopicList.protoTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TopicList
