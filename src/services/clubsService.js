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

  getClubById(id) {
    return this.clubs.get(`/clubs/${id}`).then(({ data: clubs }) => clubs);
  }

  getQuery(query) {
    return this.clubs.get(`search?q=${query}`).then(({ data: clubs }) => clubs);
  }

  saveClub(id) {
    return this.clubs.put(`/clubs/${id}/switch`).then(response => response.data);
  }
}

const clubsService = new ClubsService();

export default clubsService;
