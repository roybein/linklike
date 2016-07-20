import React, {PropTypes} from 'react'
import ErrorMessage from './../components/ErrorMessage'

var LoginForm = React.createClass({
  
  getInitialState: function() {
    return {
      username: 'test@test.com',
      password: '123456',
      showPwdHelpSpan: false,
      showUsernameHelpSpan: false,
      loginRes: {
        success: false,
        errors: [],
        errfor: {}
      },
    };
  },

  usernameChange: function(event) {
    this.setState({username: event.target.value});
    //console.log("username", event.target.value);
  },

  passwordChange: function(event) {
    this.setState({password: event.target.value});
    //console.log("password", event.target.value);
  },

  submit: function(event) {
    event.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    var url = '/login';
    $.post(url,
      {
        "username": username,
        "password": password
      },
      function (res, status) {
        //console.log(res);
        if (res.success) {
          location.href = "/login";
        } else {
          this.setState({loginRes: res});
        }
      }.bind(this)
    );
  },

  render: function() {
    return (
      <div className="container login-container">
          
        <div className="ui attached message">
          <div className="header">
            Sign In
          </div>
        </div>

        <form className="ui form attached segment login-form" onSubmit={this.submit} >
          <div className={(this.state.loginRes.errfor.hasOwnProperty("username"))? "field error" : "field"}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username"
              value={this.state.username} onChange={this.usernameChange} />
            {
              this.state.showUsernameHelpSpan ? 
              <span className="help-block">help username</span> : null
            }
          </div>
          <div className={(this.state.loginRes.errfor.hasOwnProperty("password"))? "field error" : "field"}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password"
                  value={this.state.password} onChange={this.passwordChange} />
            {
              this.state.showPwdHelpSpan ? 
              <span className="help-block">help password</span> : null
            }
          </div>
          <div className="field button">
            <div className="row">
              <button type="submit" className="ui button positive">Sign In</button>
              <a className="ui button primary right" href="/signup/">Sign Up</a>
            </div>
          </div>
        </form>

        {(this.state.loginRes.errors.length == 0)?
          null :
          <ErrorMessage  messages={this.state.loginRes.errors} />}

      </div>
    );
  }
});

module.exports = LoginForm;
