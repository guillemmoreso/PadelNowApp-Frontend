import axios from 'axios';

class ClubsService {
  constructor() {
    this.clubs = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllClubs() {
    return this.clubs.get('/clubs').then(({ data: clubs }) => clubs);
  }

  getBookById(id) {
    return this.clubs.get(`/clubs/${id}`).then(({ data: clubs }) => clubs);
  }
}

const clubsService = new ClubsService();

export default clubsService;
