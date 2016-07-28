import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addPubbee } from './../actions/topic.js'
import TopicList from './../components/TopicList'
import NewTopicForm from './../containers/NewTopicForm'

class TopicManager extends Component {

  render() {
    const {pubbees, pubbeeToAdd} = this.props;
    console.log(this.props);

    return (
      <div>
        <TopicList topics={pubbees} />
        <NewTopicForm topic={pubbeeToAdd} onAddTopic={this.props.onAddTopic}/>
      </div>
    );
  }
}

TopicManager.protoTypes = {
  pubbees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired,
  pubbeeToAdd: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    pubbees: state.getPubbeesReducer.pubbees,
    pubbeeToAdd: state.addPubbeeReducer.topic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTopic: (topic) => {
      console.log("onAddTopic", topic);
      dispatch(addPubbee(undefined, topic));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicManager)

