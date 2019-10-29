import axios from 'axios';

class SearchService {
  constructor() {
    this.clubs = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getClubsByHour() {
    return this.clubs.get('/search').then(({ data: clubs }) => clubs);
  }
}

const searchService = new SearchService();

export default searchService;
