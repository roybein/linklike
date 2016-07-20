import React, {Component, PropTypes} from 'react'

var NewNotifiForm  = React.createClass({
  propTypes: {
    topic: PropTypes.string.isRequired,
    onAddNotifi: PropTypes.func.isRequired
  },

  onAddNotifiClick: function() {
    console.log("onAddNotifiClick", this.inputTopic.value);
    this.props.onAddNotifi(this.inputTopic.value);
  },

  render: function() {
    return (
      <div className="container">
        <div className="ui form segment">
          <div className="field">
            <label>Topic</label>
            <input type="text" placeholder="topic of your notifi"
              ref={ (input) => {this.inputTopic = input}}
              defaultValue={this.props.topic} />
          </div>
          <div className="field">
            <button onClick={this.onAddNotifiClick} >Add Notifi</button>
          </div>
        </div>
      </div>
    );
  }
});

export default NewNotifiForm;
