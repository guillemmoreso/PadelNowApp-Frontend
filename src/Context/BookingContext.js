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
    date: new Date(),
  };
  //Tiene que permitir modificorlos set date y searching hour (getters & Setters)

  handleHourChange = selectInput => {
    this.setState({
      searchStartingHour: selectInput,
    });

    searchService
      .hourChange({ date: this.state.date, searchStartingHour: selectInput })
      .then(registeredInput => {
        console.log('inpuuuuuut', registeredInput);
      })
      .catch(() => {
        this.setState({
          searchStartingHour: null,
        });
      });
  };
  handleDateChange = selectInput => {
    this.setState({
      date: selectInput,
    });

    searchService
      .hourChange({ date: this.state.date, searchStartingHour: selectInput })
      .then(registeredInput => {
        console.log('inpuuuuuut', registeredInput);
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
