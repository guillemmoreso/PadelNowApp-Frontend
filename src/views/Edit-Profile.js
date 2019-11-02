import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';

class EditProfile extends Component {
  state = {
    name: this.props.user.name,
    surname: this.props.user.surname,
    username: this.props.user.username,
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, surname, username, password } = this.state;
    this.props.handleProfileUpdate({
      name,
      surname,
      username,
      password,
    });
  };

  render() {
    const { name, surname, username, password } = this.state;
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
            <input type="submit" value="Submit" className="btn" />
x        </form>
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
