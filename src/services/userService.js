import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllFavoriteClubs() {
    return this.user.get('/profile/favorites').then(({ data: clubs }) => clubs);
  }

  getAllUserBookings() {
    return this.user.get('/profile/results').then(({ data: bookings }) => bookings);
  }
}

const userService = new UserService();

export default userService;
