import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addPubbee, addSubbee } from './../actions/topic.js'
import TopicList from './../components/TopicList'
import AddPubbeeForm from './../containers/AddPubbeeForm'
import AddSubbeeForm from './../containers/AddSubbeeForm'

class TopicManager extends Component {

  render() {
    const {pubbees, pubbeeToAdd, subbees, subbeeToAdd} = this.props;
    console.log(this.props);

    return (
      <div>
        <TopicList topics={pubbees} />
        <AddPubbeeForm topic={pubbeeToAdd} onAddTopic={this.props.onAddPubbee}/>
        <TopicList topics={subbees} />
        <AddSubbeeForm topicId={subbeeToAdd} onAddTopic={this.props.onAddSubbee}/>
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
  subbeeToAdd: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    pubbees: state.pubbeesReducer.pubbees,
    pubbeeToAdd: state.pubbeesReducer.pubbeeToAdd,
    subbees: state.subbeesReducer.subbees,
    subbeeToAdd: state.subbeesReducer.subbeeToAdd,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPubbee: (topic) => {
      console.log("onAddPubbee", topic);
      dispatch(addPubbee(undefined, topic));
    },
    onAddSubbee: (topicId) => {
      console.log("onAddSubbee", topicId);
      dispatch(addSubbee(undefined, topicId));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicManager)

