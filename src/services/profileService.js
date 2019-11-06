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
}

const profileService = new ProfileService();

export default profileService;
