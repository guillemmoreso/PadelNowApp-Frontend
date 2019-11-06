import axios from 'axios';

class BookingsService {
  constructor() {
    this.bookings = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  // currentBookingData(booking) {
  //   return this.bookings.get('/search').then(response => response.data);
  // }

  getAllUserBookings() {
    return this.bookings.get('/bookings').then(({ data: bookings }) => bookings);
  }

  getBookingById(id) {
    return this.bookings.get(`/bookings/${id}`).then(({ data: bookings }) => bookings);
  }

  bookingDelete(id) {
    return this.bookings.post(`/bookings/${id}/delete`, {}).then(response => response.data);
  }
}

const bookingsService = new BookingsService();

export default bookingsService;
