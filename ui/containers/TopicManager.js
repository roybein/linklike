import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addPubbee } from './../actions/topic.js'
import TopicList from './../components/TopicList'
import NewTopicForm from './../containers/NewTopicForm'

class TopicManager extends Component {

  render() {
    const {pubbees, pubbeeToAdd, subbees} = this.props;
    console.log(this.props);

    return (
      <div>
        <TopicList topics={pubbees} />
        <NewTopicForm topic={pubbeeToAdd} onAddTopic={this.props.onAddPubbee}/>
        <TopicList topics={subbees} />
      </div>
    );
  }
}

TopicManager.protoTypes = {
  pubbees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired,
  pubbeeToAdd: PropTypes.string.isRequired,
  subbees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

const mapStateToProps = (state) => {
  return {
    pubbees: state.pubbeesReducer.pubbees,
    pubbeeToAdd: state.pubbeesReducer.pubbeeToAdd,
    subbees: state.subbeesReducer.subbees
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPubbee: (topic) => {
      console.log("onAddPubbee", topic);
      dispatch(addPubbee(undefined, topic));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicManager)

