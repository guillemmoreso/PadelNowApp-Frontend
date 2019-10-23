import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Signup extends Component {
  state = {
    nameAndSurname: '',
    email: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { nameAndSurname, email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name and Surname:</label>
          <input
            type="text"
            name="nameAndSurname"
            placeholder="Ex: Joe Doe"
            value={nameAndSurname}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input type="email" name="email" placeholder="Email address" value={email} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" placeholder="" value={password} onChange={this.handleChange} />
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
