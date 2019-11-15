import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import BookingDescription from '../components/Booking/BookingDescription';
import Backbar from '../components/Navigation/Backbar';

class BookingDetail extends Component {
  state = {
    booking: {},
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const booking = await bookingsService.getBookingById(id);
      this.setState({
        booking,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleBookingDelete = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      await bookingsService.bookingDelete(id);
      toast.error('Booking deleted');
      this.props.history.push('/bookings');
    } catch (error) {
      console.error('Error while booking delete');
    }
  };

  render() {
    const { booking, isLoading } = this.state;
    return (
      <>
        <section className="club-detail-container">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>Booking Details</h1>
          </div>
          {booking._id && (
            <>
              {!isLoading && <BookingDescription booking={booking} />}

              <div id="submit-reservation" style={{ backgroundColor: 'rgb(237, 92, 115)' }}>
                <input
                  type="submit"
                  value="Delete Booking"
                  onClick={this.handleBookingDelete}
                  id="submit-datapicker"
                  style={{ backgroundColor: 'rgb(237, 92, 115)' }}
                />
              </div>
            </>
          )}
        </section>
      </>
    );
  }
}

export default withAuth(BookingDetail);
