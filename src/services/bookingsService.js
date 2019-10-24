import axios from 'axios';

class BookingsService {
  constructor() {
    this.bookings = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }
}

const bookingsService = new BookingsService();

export default bookingsService;
