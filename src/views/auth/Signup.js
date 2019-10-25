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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          <br />
          <label>Surname:</label>
          <input type="text" name="surname" value={surname} onChange={this.handleChange} />
          <br />
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <br />
          <input type="submit" value="Signup" />
        </form>
        <div>
          <p>
            Already have an account?
            <Link to={'/login'}> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
