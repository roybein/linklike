import React, {Component, PropTypes} from 'react'

var AddPubbeeForm  = React.createClass({
  propTypes: {
    topic: PropTypes.string.isRequired,
    onAddTopic: PropTypes.func.isRequired
  },

  onAddTopicClick: function() {
    console.log("onAddTopicClick", this.inputTopic.value);
    this.props.onAddTopic(this.inputTopic.value);
  },

  render: function() {
    return (
      <div className="container">
        <div className="ui form segment">
          <div className="field">
            <label>Topic String</label>
            <input type="text" placeholder="input the topic"
              ref={ (input) => {this.inputTopic = input}}
              defaultValue={this.props.topic} />
          </div>
          <div className="field">
            <button onClick={this.onAddTopicClick} >Add Pubbee</button>
          </div>
        </div>
      </div>
    );
  }
});

export default AddPubbeeForm;
