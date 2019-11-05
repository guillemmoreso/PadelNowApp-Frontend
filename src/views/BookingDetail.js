import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import BookingDescription from '../components/BookingDescription';
import { Link } from 'react-router-dom';

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
      console.log('result:booking ', booking);
      this.setState({ booking });
    } catch (error) {
      console.error('Error buscando pistas disponibles');
    }
  };

  render() {
    const { booking, isLoading } = this.state;
    return (
      <>
        {booking._id ? (
          <>
            {!isLoading && <BookingDescription booking={booking} />}
            <div id="logout-btn-div">
              <button onClick={this.handleBookingDelete} id="logout-btn">
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>You sucessfully deleted your booking...</h1>

            <Link id="logout-btn-div" to="/search">
              {/* <Link id="home-book-btn-div" to={`/clubs/${club._id}`}> */}
              <div id="logout-btn">Book now</div>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default withAuth(BookingDetail);
