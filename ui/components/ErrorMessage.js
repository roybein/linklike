import React, {PropTypes} from 'react';

const ErrorMessage = ({error, messages}) => (
  <div className="ui bottom attached warning message">
    {messages.map( (msg, index) =>
      <div className="row" key={index}>
        <i className="icon warning circle"></i>
        {msg}
      </div>
    )} 
  </div>
);

export default ErrorMessage;
