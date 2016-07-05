import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './../../components/loginForm.jsx';

var loginForm = React.createElement(LoginForm);

ReactDOM.render(
  loginForm,
  document.getElementById('loginForm')
);
