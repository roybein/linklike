import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { newTopic } from './../actions/topic.js'
import TopicList from './../components/TopicList'
import NewTopicForm from './../containers/NewTopicForm'

class TopicManager extends Component {

  render() {
    const {topics, topic} = this.props;
    console.log(this.props);

    return (
      <div>
        <TopicList topics={topics} />
        <NewTopicForm topic={topic} onAddTopic={this.props.onAddTopic}/>
      </div>
    );
  }
}

TopicManager.protoTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired,
  topic: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    topics: state.topicsFetchReducer.topics,
    topic: state.topicNewReducer.topic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTopic: (topic) => {
      console.log("onAddTopic", topic);
      dispatch(newTopic(1, topic));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicManager)

