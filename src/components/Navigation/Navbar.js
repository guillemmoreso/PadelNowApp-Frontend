import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Navbar extends Component {
  render() {
    const { pathname } = this.props.location;
    
    return (
      <div className="nav-container">
        <nav>
          <ul>
            {this.props.isLoggedIn ? null : (
              <>
                <li>
                  <Link to="/bookings">
                    <img src={'/images/booking.svg'} alt="Booking" />
                    Bookings
                  </Link>
                </li>
                {pathname === '/map' ? (
                  <li>
                    <Link to="/search">
                      <img src={'/images/search.svg'} alt="Search" />
                      Search
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/map">
                      <img src={'/images/map-navbar.svg'} alt="Map" />
                      Map
                    </Link>
                  </li>
                )}

                <li>
                  <Link to="/profile">
                    <img src={'/images/profile.svg'} alt="Profile" />
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(withAuth(Navbar));
