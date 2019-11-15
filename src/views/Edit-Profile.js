import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import Backbar from '../components/Navigation/Backbar';
import profileService from '../services/profileService';

class EditProfile extends Component {
  state = {
    name: this.props.user.name,
    surname: this.props.user.surname,
    username: this.props.user.username,
    password: '',
    avatarImg: this.props.user.avatarImg,
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

  checkUploadResult = async resultEvent => {
    if (resultEvent.event === 'success') {
      const avatarImg = resultEvent.info.secure_url;
      console.log('upload', avatarImg);
      const uploadImage = await profileService.uploadImage({ avatarImg });
      this.setState({ avatarImg });

      // this.props
      //   .handlePostPhoto({ user_id: this.props.user._id, caption: '', url: resultEvent.info.secure_url })
      //   .then(this.props.history.push('/profile'));
    }
  };

  showWidget = widget => {
    widget.open();
  };

  render() {
    const { name, surname, username, password } = this.state;
    const { handleUserDelete } = this.props;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dalhi9ynf',
        uploadPreset: 'oyxpj1uw',
      },
      (error, result) => {
        this.checkUploadResult(result);
      },
    );

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Edit Profile</h1>
        </div>
        <div className="edit-profile-container">
          <img id="user-profile-edit" src={this.props.user.avatarImg} alt="profile" />
          <div id="upload-avatar">
            <button onClick={() => this.showWidget(widget)}>Upload Picture</button>
          </div>
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
          </form>
        </div>
      </>
    );
  }
}

export default withAuth(EditProfile);
