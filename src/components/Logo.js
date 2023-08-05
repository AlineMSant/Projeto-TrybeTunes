import React from 'react';
import '../App.css';
import logo from '../image/logo.png';

class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <p>trybe tunes</p>
        <img src={ logo } alt="logo" />
      </div>
    );
  }
}

export default Logo;
