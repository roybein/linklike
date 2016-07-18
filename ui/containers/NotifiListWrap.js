import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import NotifiList from './../components/NotifiList'

const mapStateToProps = (state) => {
  return {
    notifis: state.notifisFetchReducer.notifis
  }
}

const NotifiListWrap = connect(mapStateToProps)(NotifiList)

export default NotifiListWrap
