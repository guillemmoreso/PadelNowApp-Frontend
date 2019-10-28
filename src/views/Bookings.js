import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import Loading from '../components/Loading/Loading';

class Bookings extends Component {
  state = {
    bookings: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const bookings = await bookingsService.getAllUserBookings();
      this.setState({
        bookings,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { bookings, isLoading } = this.state;

    return (
      <>
        <header className="header-bookings">
          <h1>Bookings</h1>
        </header>
        <section className="card-container">
          <div className="header">
            <p className="title">Bookings</p>
            {!isLoading &&
              bookings.map(booking => {
                return (
                  <div key={booking._id}>
                    <p>{booking.startingHour}</p>
                  </div>
                );
              })}
            {isLoading && <Loading />}
          </div>
        </section>
      </>
    );
  }
}

export default withAuth(Bookings);
