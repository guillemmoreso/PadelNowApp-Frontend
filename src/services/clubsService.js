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

  saveClubToFavorites(id) {
    return this.clubs.put(`/clubs/${id}/switch`).then(response => response.data);
  }

  dataPickerClubDetail(search) {
    const { searchStartingHour, date, clubId } = search;
    return this.clubs.post(`/clubs/${clubId}`, { searchStartingHour, date }).then(({ data }) => {
      return data;
    });
  }
}

const clubsService = new ClubsService();

export default clubsService;
