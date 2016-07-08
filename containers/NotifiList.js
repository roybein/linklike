import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import Notifi from './../components/Notifi'

const mapStateToProps = (state) => {
  return {
    text: state.notifis
  }
}

const NotifiList = connect(
  mapStateToProps
)(Notifi)

export default NotifiList
