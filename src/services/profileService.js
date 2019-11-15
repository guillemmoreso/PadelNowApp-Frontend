import axios from 'axios';

class ProfileService {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllFavoriteClubs() {
    return this.profile.get('/profile/favorites').then(({ data: clubs }) => clubs);
  }

  getAllUserBookings() {
    return this.profile.get('/profile/results').then(({ data: bookings }) => bookings);
  }

  getAllUserFriends() {
    return this.profile.get('/profile/friends').then(({ data: friends }) => friends);
  }

  getAllUsers() {
    return this.profile.get('/profile/friends/users').then(({ data: allUsers }) => allUsers);
  }

  uploadAvatarImg(user) {
    return this.profile.post('/profile/friends/users').then(response => response.data);
  }

  getUserById(id) {
    return this.profile.get(`/player/${id}`).then(({ data: player }) => player);
  }

  savePetition(id) {
    return this.profile.put(`/player/${id}/petition`).then(response => response.data);
  }

  uploadImage(img) {
    const { avatarImg } = img;
    return this.profile.post('/profile/edit-profile/upload', { avatarImg }).then(({ data }) => {
      return data;
    });
  }
  // uploadHandler(formData) {
  //   return this.profile.post('/profile/edit-profile/upload', formData).then(({ data: avatarImg }) => avatarImg);
  // }

  // handleUpload(uploadData) {
  //   return this.profile.post('/profile/edit-profile/upload', uploadData).then({ avatarImg: response.secure_url });
  // }

  // saveNewThing() {
  //   return this.profile.post('/profile/edit-profile/upload', uploadData).then({ avatarImg: response.secure_url });
  // }
}

const profileService = new ProfileService();

export default profileService;
