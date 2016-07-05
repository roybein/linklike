import React from 'react';
import ReactDOM from 'react-dom';

import NewLink from './../../components/test.jsx';

var newLink = React.createElement(NewLink);

ReactDOM.render(
  newLink,
  document.getElementById('newLink')
);
