import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';

class MatchResults extends Component {
  state = {
    userBookings: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const userBookings = await userService.getAllUserBookings();
      this.setState({
        userBookings,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userBookings, isLoading } = this.state;

    return (
      <>
        {!isLoading &&
          userBookings.map(booking => {
            return (
              <>
                <h3>{booking.startingHour}</h3>
                <h3>{booking.club.city}</h3>
              </>
            );
          })}
      </>
    );
  }
}

export default withAuth(MatchResults);
