// // eslint-disable-next-line max-classes-per-file
// import React, { Component, createContext } from 'react';
// import bookingsService from '../services/bookingsService';
// import Loading from '../components/Loading/Loading';

// const BookingContext = createContext();

// const { Provider } = BookingContext;

// const BookingConsumer = BookingContext.Consumer;

// export const withBooking = Comp => {
//   return class withBooking extends Component {
//     render() {
//       return (
//         <BookingConsumer>
//           {({ searchStartingHour, date, isLoading }) => (
//             <Comp {...this.props} searchStartingHour={searchStartingHour} date={date} isLoading={isLoading} />
//           )}
//         </BookingConsumer>
//       );
//     }
//   };
// };

// export default class BookingProvider extends Component {
//   state = {
//     searchStartingHour: null,
//     date: null,
//     isLoading: true,
//   };
//   //Tiene que permitir modificorlos set date y searching hour (getters & Setters)

//   render() {
//     const { isLoading, searchStartingHour, date } = this.state;
//     const { children } = this.props;
//     if (isLoading) {
//       return <Loading />;
//     }
//     return (
//       <Provider
//         value={{
//           isLoading,
//           searchStartingHour,
//           date,
//         }}
//       >
//         {children}
//       </Provider>
//     );
//   }
// }
