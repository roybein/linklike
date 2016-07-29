import React, {Component, PropTypes} from 'react'

var AddSubbeeForm  = React.createClass({
  propTypes: {
    topicId: PropTypes.string.isRequired,
    onAddTopic: PropTypes.func.isRequired
  },

  onAddTopicClick: function() {
    console.log("onAddTopicClick", this.inputTopicId.value);
    this.props.onAddTopic(this.inputTopicId.value);
  },

  render: function() {
    return (
      <div className="container">
        <div className="ui form segment">
          <div className="field">
            <label>Topic ID</label>
            <input type="number" placeholder="input the topic id"
              ref={ (input) => {this.inputTopicId = input}}
              defaultValue={this.props.topicId} />
          </div>
          <div className="field">
            <button onClick={this.onAddTopicClick} >Add Subbee</button>
          </div>
        </div>
      </div>
    );
  }
});

export default AddSubbeeForm;
