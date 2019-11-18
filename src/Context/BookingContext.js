// eslint-disable-next-line max-classes-per-file
import React, { Component, createContext } from 'react';
import searchService from '../services/searchService';

const BookingContext = createContext();

const { Provider } = BookingContext;

const BookingConsumer = BookingContext.Consumer;

export const withBooking = Comp => {
  return class withBooking extends Component {
    render() {
      return (
        <BookingConsumer>
          {({ handleHourChange, searchStartingHour, date, handleDateChange }) => (
            <Comp
              {...this.props}
              searchStartingHour={searchStartingHour}
              date={date}
              handleHourChange={handleHourChange}
              handleDateChange={handleDateChange}
            />
          )}
        </BookingConsumer>
      );
    }
  };
};

export default class BookingProvider extends Component {
  state = {
    searchStartingHour: '9',
    date: new Date(),
  };

  handleHourChange = hour => {
    this.setState({
      searchStartingHour: hour,
    });

    searchService
      .getClubs({ date: this.state.date, searchStartingHour: hour })
      .then(response => response)
      .catch(error => {
        console.error(error);
      });
  };

  handleDateChange = date => {
    this.setState({
      date,
    });

    searchService
      .getClubs({ date: this.state.date })
      .then(response => response)
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { searchStartingHour, date } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          searchStartingHour,
          date,
          handleHourChange: this.handleHourChange,
          handleDateChange: this.handleDateChange,
        }}
      >
        {children}
      </Provider>
    );
  }
}
