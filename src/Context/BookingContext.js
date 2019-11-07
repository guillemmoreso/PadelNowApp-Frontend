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
          {({ handleHourChange, searchStartingHour, date }) => (
            <Comp
              {...this.props}
              searchStartingHour={searchStartingHour}
              date={date}
              handleHourChange={handleHourChange}
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
    date: null,
  };
  //Tiene que permitir modificorlos set date y searching hour (getters & Setters)

  handleHourChange = selectInput => {
    searchService
      .hourChange(selectInput)
      .then(registeredInput => {
        this.setState({
          searchStartingHour: registeredInput,
        });
      })
      .catch(() => {
        this.setState({
          searchStartingHour: null,
        });
      });
  };

  render() {
    const { searchStartingHour, date } = this.state;
    const { children } = this.props;
    console.log('Context searchStartingHour ', searchStartingHour);
    return (
      <Provider
        value={{
          searchStartingHour,
          handleHourChange: this.handleHourChange,
          date,
        }}
      >
        {children}
      </Provider>
    );
  }
}
