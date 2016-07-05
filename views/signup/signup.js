import React from 'react';
import ReactDOM from 'react-dom';
import SignupForm from './../../components/signupForm.jsx';

var signupForm = React.createElement(SignupForm);

ReactDOM.render(
  signupForm,
  document.getElementById('signupForm')
);
