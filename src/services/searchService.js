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

  dataPicker(user) {
    const { startingHour, date } = user;
    console.log('datePicker ', user);

    return this.search.post('/search', { startingHour, date }).then(({ data }) => {
      console.log('Respuesta: ', data);
      return data;
    });
  }
}

const searchService = new SearchService();

export default searchService;
