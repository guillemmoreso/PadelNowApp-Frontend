import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Signup extends Component {
  state = {
    name: '',
    surname: '',
    username: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, surname, username, password } = this.state;
    this.props.handleSignup({
      name,
      surname,
      username,
      password,
    });
  };

  render() {
    const { name, surname, username, password } = this.state;
    return (
      <div className="log-sign-container">
        <img id="logo-login" src="../../images/padelnow-logo.png" alt="nav-avatar"></img>
        <form onSubmit={this.handleFormSubmit} id="signup-input">
          <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Name" />
          <br />
          <input type="text" name="surname" value={surname} onChange={this.handleChange} placeholder="Surname" />
          <br />
          <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
          <br />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
          <br />
          <input type="submit" value="Signup" className="btn" />
        </form>

        <div>
          <p className="alternative">
            Already have an account? 
            <Link to={'/login'} style={{ textDecoration: 'none' }}>
              <span> Login</span>
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
