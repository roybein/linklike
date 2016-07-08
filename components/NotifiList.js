import React, {PropTypes} from 'react'

import Notifi from './../components/Notifi'

const NotifiList = ({ notifis }) => (
  <ul>
    {notifis.map(notifi =>
      <Notifi
        key={notifi.id}
        text={notifi.text}
      />
    )}
  </ul>
)

NotifiList.protoTypes = {
  notifis: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default NotifiList
