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

  // dataPicker(search) {
  //   const { searchStartingHour, date } = search;
  //   return this.search.post('/search', { searchStartingHour, date }).then(({ data }) => {
  //     return data;
  //   });
  // }

  dataPicker(search) {
    const { date } = search;
    return this.search.post('/search', { date }).then(({ data }) => {
      return data;
    });
  }

  hourChange(selectInput) {
    console.log('input: ', selectInput);
    return this.search.post('/search', { selectInput }).then(({ data: selectedHour }) => selectedHour);
  }
}

const searchService = new SearchService();

export default searchService;
