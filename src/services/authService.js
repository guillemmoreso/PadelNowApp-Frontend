import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { username, password, name, surname } = user;
    return this.auth.post('/signup', { username, password, name, surname }).then(({ data }) => {
      return data;
    });
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/login', { username, password }).then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {}).then(response => response.data);
  }

  userDelete() {
    return this.auth.post('/profile/edit-profile/delete', {}).then(response => response.data);
  }

  me(user) {
    return this.auth.get('/me').then(response => response.data);
  }

  profileUpdate(user) {
    const { username, name, surname } = user;
    return this.auth.put('/profile/edit-profile', { username, name, surname }).then(({ data }) => {
      return data;
    });
  }
}

const authService = new AuthService();

export default authService;
