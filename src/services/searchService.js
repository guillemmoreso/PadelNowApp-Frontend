import axios from 'axios';

class SearchService {
  constructor() {
    this.search = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getClubsByHour() {
    return this.search.get('/search').then(({ data: clubs }) => clubs);
  }

  dataPicker(search) {
    const { searchStartingHour, date } = search;

    return this.search.post('/search', { searchStartingHour, date }).then(({ data }) => {
      console.log('Respuesta: ', data);
      return data;
    });
  }

  hourChange(selectInput) {
    const { searchStartingHour } = selectInput;
    return this.search.post('/search', { searchStartingHour }).then(({ data }) => {
      console.log('Respuesta Context: ', data);
      return data;
    });
  }

  signup(user) {
    const { searchStartingHour, date } = user;
    return this.search.post('/search', { searchStartingHour, date }).then(({ data }) => {
      console.log('Respuesta: Context ', data);
      return data;
    });
  }

  // bookNow(search) {
  //   const { searchStartingHour, date } = search;

  //   return this.search.post('/search', { searchStartingHour, date }).then(({ data }) => {
  //     console.log('Respuesta:Booknow ', data);
  //     return data;
  //   });
  // }
}

const searchService = new SearchService();

export default searchService;
