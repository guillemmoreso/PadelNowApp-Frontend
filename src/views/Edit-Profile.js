import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';

class EditProfile extends Component {
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
    const { name, surname, username, password } = this.props.user;
    const { handleLogout } = this.props;

    return (
      <div className="log-sign-container">
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleFormSubmit} id="signup-input">
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          <br />
          <input type="text" name="surname" value={surname} onChange={this.handleChange} />
          <br />
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="New Password"
          />
          <br />
          <input type="submit" value="Signup" className="btn" />
        </form>
        <div id="logout-btn-div">
          <button onClick={handleLogout} id="logout-btn">
            Delete Account
          </button>
        </div>
      </div>
    );
  }
}

export default withAuth(EditProfile);
