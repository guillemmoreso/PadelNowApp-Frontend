import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class Profile extends Component {
  state = {
    img: '',
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="profile-container">
        <h1>Editar perfil</h1>
      </div>
    );
  }
}

export default withAuth(Profile);
