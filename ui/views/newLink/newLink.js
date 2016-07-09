import React from 'react';
import ReactDOM from 'react-dom';

import NewLink from './../../containers/test';

var newLink = React.createElement(NewLink);

ReactDOM.render(
  newLink,
  document.getElementById('newLink')
);
