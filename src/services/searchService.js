import axios from 'axios';

class SearchService {
  constructor() {
    this.clubs = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllClubs() {
    return this.clubs.get('/clubs').then(({ data: clubs }) => clubs);
  }
}

const searchService = new SearchService();

export default searchService;
