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

  uploadImage(avatarImgUpload) {
    console.log(avatarImgUpload);
    return this.profile.put('/profile/edit-profile/upload', avatarImgUpload).then(({ data }) => {
      return data;
    });
  }
}

const profileService = new ProfileService();

export default profileService;
