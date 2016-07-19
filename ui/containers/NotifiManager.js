import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import NotifiList from './../components/NotifiList'

class NotifiManager extends Component {
  render() {
    const {notifis} = this.props;

    return (
      <NotifiList notifis={notifis} />
    )
  }
}

NotifiManager.protoTypes = {
  notifis: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    notifis: state.notifisFetchReducer.notifis
  }
}

export default connect(mapStateToProps)(NotifiManager)

