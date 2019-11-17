import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withAuth } from '../../Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { username, password } = this.state;
      this.props.handleLogin({
        username,
        password,
      });
      toast.success('Welcome to Padelnow');
    } catch (error) {
      console.error('Error while loggin in');
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="log-sign-container">
        <img id="logo-login" src="../../images/padelnow-logo.png" alt="nav-avatar"></img>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
          <input type="submit" value="Login" className="btn" />
        </form>
        <p className="alternative">
          Don't have an account yet?
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <span> Signup</span>
          </Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Login);
