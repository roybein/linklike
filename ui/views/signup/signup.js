import React from 'react';
import ReactDOM from 'react-dom';
import SignupForm from './../../containers/signupForm';

var signupForm = React.createElement(SignupForm);

ReactDOM.render(
  signupForm,
  document.getElementById('signupForm')
);
