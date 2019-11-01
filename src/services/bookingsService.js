import axios from 'axios';

class BookingsService {
  constructor() {
    this.bookings = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllUserBookings() {
    return this.bookings.get('/bookings').then(({ data: bookings }) => bookings);
  }

  getClubById(id) {
    return this.bookings.get(`/bookings/${id}`).then(({ data: clubs }) => clubs);
  }
}

const bookingsService = new BookingsService();

export default bookingsService;
