import React, {Component, PropTypes} from 'react'

class NewNotifiForm extends Component {

  render() {
    return (
      <div className="container">
        <div className="ui form segment">
          <div className="field">
            <label>Topic</label>
            <input type="text" placeholder="topic of your notifi"
              defaultValue={this.props.topic} />
          </div>
          <div className="field">
            <button onClick={this.props.onAddNotifi}>Add Notifi</button>
          </div>
        </div>
      </div>
    );
  }
}

NewNotifiForm.propTypes = {
  topic: PropTypes.string.isRequired,
  onAddNotifi: PropTypes.func.isRequired
}

export default NewNotifiForm;
