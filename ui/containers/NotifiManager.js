import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { newNotifi } from './../actions/notifs.js'
import NotifiList from './../components/NotifiList'
import NewNotifiForm from './../containers/NewNotifiForm'

class NotifiManager extends Component {

  render() {
    const {notifis, topic} = this.props;
    console.log(this.props);

    return (
      <div>
        <NotifiList notifis={notifis} />
        <NewNotifiForm topic={topic} onAddNotifi={this.props.onAddNotifi}/>
      </div>
    );
  }
}

NotifiManager.protoTypes = {
  notifis: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired,
  topic: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    notifis: state.notifisFetchReducer.notifis,
    topic: state.notifiNewReducer.topic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNotifi: (topic) => {
      console.log("onAddNotifi", topic);
      dispatch(newNotifi(1, topic));
    }
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifiManager)

