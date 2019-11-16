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

  getBookingById(id) {
    return this.bookings.get(`/bookings/${id}`).then(({ data: bookings }) => bookings);
  }

  bookingDelete(id) {
    return this.bookings.post(`/bookings/${id}/delete`, {}).then(response => response.data);
  }

  newBooking(newReservation) {
    const { searchStartingHour, date, clubId, userId, courtId } = newReservation;
    return this.bookings
      .post(`/reservation/${clubId}`, { searchStartingHour, date, clubId, userId, courtId })
      .then(({ data }) => {
        return data;
      });
  }

  gameResult(bookingResult) {
    const { gameResult, bookingId } = bookingResult;
    return this.bookings.put(`/profile/results/${bookingId}`, { gameResult }).then(({ data }) => {
      return data;
    });
  }
}

const bookingsService = new BookingsService();

export default bookingsService;
