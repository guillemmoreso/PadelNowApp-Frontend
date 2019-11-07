import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import BookingDescription from '../components/Booking/BookingDescription';
import Backbar from '../components/Navigation/Backbar';

class BookingDetail extends Component {
  state = {
    booking: {},
    isLoading: true,
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
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  }

  handleBookingDelete = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const booking = await bookingsService.bookingDelete(id);
      this.setState({ booking });
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
          {booking._id ? (
            <>
              {!isLoading && <BookingDescription booking={booking} />}
              <div id="logout-btn-div">
                <button onClick={this.handleBookingDelete} id="logout-btn">
                  Delete Booking
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>You sucessfully deleted your booking...</h1>

              <Link id="logout-btn-div" to="/search">
                <div id="logout-btn">Book now</div>
              </Link>
            </>
          )}
        </section>
      </>
    );
  }
}

export default withAuth(BookingDetail);
