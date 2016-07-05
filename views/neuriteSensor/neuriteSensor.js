import React from 'react';
import ReactDOM from 'react-dom';

import NeuriteSensor from './../../components/neuriteSensor.jsx';

var neuriteSensor = React.createElement(NeuriteSensor);

ReactDOM.render(
  neuriteSensor,
  document.getElementById('neuriteSensor')
);
